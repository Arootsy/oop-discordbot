import { GuildMember, TextChannel } from 'discord.js';
import { member_activity_channel } from '../settings.json';
import logger from '../utils/logger';
import Config from '../config';

const MAX_RETRIES = 3;
const RETRY_DELAY = 5 * 60 * 1000;

export const onMemberJoin = async (member: GuildMember) => {
  const channel = member.guild.channels.cache.get(member_activity_channel) as TextChannel;
  if (!channel) return;

  const welcomeMessage = `Welcome <@${member.user.id}> (${member.user.username}) to the server!`;
  channel.send(welcomeMessage);

  const roleId = Config.MEMBER_ROLE_ID;
  const role = member.guild.roles.cache.get(roleId);

  if (!role) {
    logger.error(`Role not found: ${roleId}`);
    return;
  }

  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      await member.roles.add(role);
      logger.info(`Assigned role '${role.name}' to ${member.displayName}`);
      break;
    } catch (error) {
      logger.error(`Could not assign role to ${member.displayName}: ${error}`);
      retries++;
      if (retries < MAX_RETRIES) {
        logger.info(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
};