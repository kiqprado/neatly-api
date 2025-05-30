export function NormalizeItemsOnList(text: string): string[] {
  return text
    .split(/[\n,;]+|\s{2,}/g)
    .map(item => item.trim().toLowerCase())
    .filter(item => item.length > 1)
}