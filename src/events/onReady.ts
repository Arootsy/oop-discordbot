import { Client, TextChannel, REST, Routes, ActivityType } from 'discord.js';
import commands from '../handlers/commandHandler';
import { Config } from '../config';
import { log_channel } from '../settings.json';
import logger from '../utils/logger';

export const onReady = async (Bot: Client) => {
  const rest = new REST({ version: '10' }).setToken(Config.DISCORD_TOKEN);
  const commandData = Array.from(commands.values()).map((command) => command.data.toJSON());
  await rest.put(Routes.applicationCommands(Config.DISCORD_CLIENT_ID), { body: commandData });
  const logChannel = Bot.channels.cache.get(log_channel) as TextChannel;
  logChannel && (await logChannel.send('Bot started.'));
  logger.info('Bot ready');
  Bot.user?.setPresence({
    activities: [{ name: 'https://zweetstreep.nl', type: ActivityType.Custom }],
    status: 'online',
  });
};