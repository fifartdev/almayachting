/**
 * Helpers for the HTML that WordPress returns for rich text fields.
 * Paragraph breaks are preserved (one string per block); inline formatting is discarded.
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  middot: "·",
  euro: "€",
};

export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === "#") {
      const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

export function richTextToParagraphs(html: unknown): string[] {
  if (typeof html !== "string" || !html.trim()) return [];
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .split(/<\/(?:p|h[1-6]|li|blockquote|div)>/i)
    .map((block) => decodeEntities(block.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export function richTextToPlainText(html: unknown): string {
  return richTextToParagraphs(html).join(" ");
}
