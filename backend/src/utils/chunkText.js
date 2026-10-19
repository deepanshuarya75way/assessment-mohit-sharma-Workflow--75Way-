export function chunkText(text, chunkSize = 1000, overlap = 150) {
  const cleaned = text.replace(/\s+/g, ' ').trim();

  if (!cleaned) return [];

  const chunks = [];
  let start = 0;

  while (start < cleaned.length) {
    const end = Math.min(start + chunkSize, cleaned.length);
    const chunk = cleaned.slice(start, end).trim();

    if (chunk) chunks.push(chunk);
    if (end === cleaned.length) break;

    start = end - overlap;
  }

  return chunks;
}