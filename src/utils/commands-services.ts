type CommandResponse = {
  pt: string
  en: string
}

interface ICommandPattern {
  triggers: string[]
  responses: CommandResponse
}

interface ICommandsServices extends Record<string, ICommandPattern> {
  start: ICommandPattern
  help: ICommandPattern
  list: ICommandPattern
  clear: ICommandPattern
  ready: ICommandPattern
}

export type CommandKey = keyof ICommandsServices

export const CommandServices: ICommandsServices = {
  start: {
    triggers: [
      '/start', '/inicio', '/begin', '!start', '!inicio', '!begin'
    ],
    responses: {
      pt: '👋 Olá! Eu sou o bot organizador de listas!\n\n' +
          'Use "!lista" para começar ou "!ajuda" para comandos.',
      en: '👋 Hi! I\'m the list organizer bot!\n\n' +
          'Use "!list" to start or "!help" for commands.'
    }
  },

  help: {
    triggers: [
      '/ajuda', '/help', '!ajuda', '!help'
    ], 
    responses: {
      pt: '📋 *Comandos disponíveis:*\n\n' +
          '!lista - Iniciar nova lista\n' +
          '!pronto - Finalizar a lista\n' +
          '!limpar - Cancelar lista\n' +
          '!ajuda - Mostrar comandos',
      en: '📋 *Available commands:*\n\n' +
          '!list - Start new list\n' +
          '!ready - Finish list\n' +
          '!clear - Cancel list\n' +
          '!help - Show commands'
    }
  },

  list: {
    triggers: [
      '/lista', '/list', '!lista', '!list'
    ],
    responses: {
      pt: '📝 Lista iniciada! Envie os itens um por um.',
      en: '📝 List started! Send items one by one.'
    }
  },

  clear: {
    triggers: [
      '/limpar', '/clear', '!limpar', '!clear'
    ],
    responses: {
      pt: '🗑️ Lista limpa! Pode começar uma nova.',
      en: '🗑️ List cleared! You can start a new one.'
    }
  },
  ready: {
    triggers: [
      '/pronto', '/ready', '!pronto', '!ready'
    ],
    responses: {
      pt: '✅ Lista finalizada! Aqui está o resultado...',
      en: '✅ List completed! Here is the result...'
    }
  }
}