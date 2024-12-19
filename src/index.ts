import { Config } from './config';
import { Client, GatewayIntentBits } from 'discord.js';
import { onInteraction } from './events/onInteraction';
import { onReady } from './events/onReady';

import { onMemberJoin } from './events/onMemberJoin';
import { onMemberLeave } from './events/onMemberLeave';
import { onSlashCommand } from './events/onSlashCommand';

export const Bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

Bot.once('ready', async () => await onReady(Bot));

Bot.on('guildMemberAdd', async (member) => await onMemberJoin(member));
Bot.on('guildMemberRemove', async (member) => await onMemberLeave(member));
Bot.on('interactionCreate', async (interaction) => {
  await onInteraction(interaction);
  await onSlashCommand(interaction);
});

Bot.login(Config.DISCORD_TOKEN);