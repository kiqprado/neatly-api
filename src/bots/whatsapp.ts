import { NormalizeListInput } from '../utils/normalize-list'

import { OrganizeItemsByCategory } from '../services/organize-list'

import { GetSession, ResetSession } from '../session/session-store'

export async function HandleWhatsAppMessage(
  message: string,
  senderId: string
): Promise<string> {
  const session = GetSession(`wa_${senderId}`)
  const text = message.toLowerCase().trim()

  if (text.includes('oi') || text.includes('olá')) {
    return '👋 Olá! Envie *"lista"* para começar.';
  }

  if (text.includes('lista')) {
    session.collectingList = true;
    session.listItems = [];
    return '📝 Modo lista ativado! Envie os itens um por um ou separados por vírgula.';
  }

  if (text.includes('pronto')) {
    if (!session.collectingList) {
      return '❌ Você não começou uma lista ainda.';
    }

    const organized = await OrganizeItemsByCategory(session.listItems);
    ResetSession(`wa_${senderId}`);

    let response = '📋 *LISTA ORGANIZADA* 📋\n\n';
    for (const [category, items] of Object.entries(organized)) {
      response += `*${category.toUpperCase()}*\n${items.map(i => `- ${i}`).join('\n')}\n\n`;
    }

    return response.trim();
  }

  if (session.collectingList) {
    const items = NormalizeListInput(text); // <-- Seu normalize original!
    session.listItems.push(...items);
    return `✅ Adicionado: ${items.join(', ')}`;
  }

  return '🤖 Não entendi. Envie *"lista"* para começar ou *"ajuda"*.';
}