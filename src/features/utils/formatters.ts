export function formatTextSplit(text: string): string {
  const index = text.indexOf('.');
  if (index === -1) return text;

  const first = text.slice(0, index + 1).trim();
  const second = text.slice(index + 1).trim();

  return `${first}\n${second}`;
}
