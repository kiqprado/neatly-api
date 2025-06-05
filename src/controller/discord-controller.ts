import { Client, Message} from 'discord.js'
import { Language } from '../utils/language-pack'
import { HandleDiscordBot } from '../bots/discord-bot'

export function MessageDiscordController() {
  const client = new Client({
    intents: [
      'Guilds',
      'GuildMembers',
      'MessageContent'
    ]
  })

  client.on('ready', () => {
    console.log(`Bot conectado com ${client.user?.tag}`)
  })

  client.on('messageCreate', async (message: Message) => {
    if(message.author.bot) return

    const lang: Language = 'pt'

    const response = await HandleDiscordBot(
      message.content,
      lang,
      message.author.id
    )

    await message.reply({
      content: response,
      allowedMentions: { repliedUser: false}
    })
  })

  return client
}