// The Open Trivia DB encodes special characters as HTML entities in question text.
// This map covers the ones we see in practice; unknown entities are left as-is.
const HTML_ENTITIES: Record<string, string> = {
  '&amp;':   '&',
  '&lt;':    '<',
  '&gt;':    '>',
  '&quot;':  '"',
  '&#039;':  "'",
  '&ldquo;': '\u201C',
  '&rdquo;': '\u201D',
  '&lsquo;': '\u2018',
  '&rsquo;': '\u2019',
};

export function decodeHtmlEntities(text: string): string {
  return text.replace(/&[^;]+;/g, (entity) => HTML_ENTITIES[entity] ?? entity);
}
