// src/bots/discord-bot.ts
import { Client, Message } from 'discord.js'
import { HandleDiscordMessage } from '../bots/discord'

export function SetupDiscordBot() {
  const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'MessageContent']
  })

  client.on('ready', () => {
    console.log(`Bot conectado como ${client.user?.tag}!`)
  })

  client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return

    const isCommand = message.content.startsWith('!')
    
    const response = await HandleDiscordMessage(
      message.content,
      'pt',
      message.author.id
    )

    await message.reply({
      content: response,
      allowedMentions: { repliedUser: false }
    })
  })

  return client
}