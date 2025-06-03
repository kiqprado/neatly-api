type SessionData = {
  isCollectingList: boolean
  listItems: string[]
}

const sessions =  new Map<string, SessionData>()

export function GetChatSessionStore(sessionId: string): SessionData {
  if(!sessions.has(sessionId)) {
    sessions.set(sessionId, { isCollectingList: false, listItems: []})
  }

  return sessions.get(sessionId)!
}
export function ResetChatSessionStore(sessionId: string) {
  sessions.set(sessionId, { isCollectingList: false, listItems: []})
}