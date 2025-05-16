import axios from 'axios'

import { FastifyRequest, FastifyReply } from 'fastify'

import { HandleWhatsAppMessage } from '../bots/whatsapp'

interface WebhookBody {
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: Array<{
          type: string
          from: string
          text?: { body: string }
        }>
      }
    }>
  }>
}

export class WhatsAppMetaClient {
  private readonly baseUrl = 'https://graph.facebook.com/v18.0'

  constructor(
    private readonly phoneNumberId: string,
    private readonly token: string
  ) {}

  async sendText(to: string, text: string) {
    await axios.post(
      `${this.baseUrl}/${this.phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: text }
      },
      {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

const client =  new WhatsAppMetaClient(
  process.env.WHATSAPP_PHONE_NUMBER_ID!,
  process.env.WHATSAPP_META_TOKEN!
)

export async function WebHookHandler(
  req: FastifyRequest<{
    Querystring: { 'hub.verify_token'?: string; 'hub.challenge'?: string }
    Body: WebhookBody
  }>,
  reply: FastifyReply
) {
  if(req.method === 'GET') {
    if(req.query['hub.verify_token'] === process.env.WHATSAPP_VERIFY_TOKEN) {
      return reply.send(req.query['hub.challenge'])
    }

    return reply.status(403).send()
  }

  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

  if(message?.type === 'text' && message.text?.body) {
    const response = await HandleWhatsAppMessage(
      message.text.body,
      message.from
    )

    await client.sendText(message.from, response)
  }

  return reply.send({ status: 'ok'})
  
}