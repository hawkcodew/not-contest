export function formatTextSplit(text: string): string {
  const index = text.indexOf('.');
  if (index === -1) return text;

  const first = text.slice(0, index + 1).trim();
  const second = text.slice(index + 1).trim();

  return `${first}\n${second}`;
}

export const formatDate = (timestampInSeconds: number): string => {
  const date = new Date(timestampInSeconds * 1000);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = String(date.getFullYear()).slice(-2);

  return `${day} ${month} ‘${year}`;
};
