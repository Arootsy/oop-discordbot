import { Client, GatewayIntentBits } from 'discord.js';
import { Config } from './config';
import { onInteraction } from './events/onInteraction';
import { onReady } from './events/onReady';
import { onMemberJoin } from './events/onMemberJoin';
import { onMemberLeave } from './events/onMemberLeave';
import { onSlashCommand } from './events/onSlashCommand';

class Bot {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });

    this.setupEvents();
  }

  private setupEvents() {
    this.client.once('ready', async () => await onReady(this.client));
    this.client.on('guildMemberAdd', async (member) => await onMemberJoin(member));
    this.client.on('guildMemberRemove', async (member) => await onMemberLeave(member));
    this.client.on('interactionCreate', async (interaction) => {
      await onInteraction(interaction);
      await onSlashCommand(interaction);
    });
  }

  public start() {
    this.client.login(Config.DISCORD_TOKEN);
  }
}

const bot = new Bot();
bot.start();