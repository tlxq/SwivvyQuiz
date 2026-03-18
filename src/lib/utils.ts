/**
 * Utility function to decode HTML entities from API strings.
 * Uses a mapping and regex for efficient, concise replacement.
 */
export const decodeHTML = (str: string): string => {
  const map: Record<string, string> = {
    '&quot;': '"',
    '&#039;': "'",
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
  };
  return str.replace(/&quot;|&#039;|&amp;|&lt;|&gt;|&rsquo;|&lsquo;|&ldquo;|&rdquo;/g, m => map[m]);
};
