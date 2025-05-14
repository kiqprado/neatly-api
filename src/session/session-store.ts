type SessionData = {
  collectingList: boolean
  listItems: string[]
}

const sessions = new Map<string, SessionData>()

export function GetSession(sessionId: string): SessionData {
  if(!sessions.has(sessionId)) {
    sessions.set(sessionId, {collectingList: false, listItems: [] })
  }

  return sessions.get(sessionId)!
}

export function ResetSession(sessionId: string) {
  sessions.set(sessionId, { collectingList: false, listItems: [] })
}