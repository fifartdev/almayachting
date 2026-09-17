/**
 * Minimal Lexical richText -> plain text helpers.
 * Paragraph breaks are preserved (one string per top-level block);
 * inline formatting is discarded.
 */

interface LexicalNode {
  text?: string;
  children?: LexicalNode[];
}

interface LexicalRichText {
  root?: { children?: LexicalNode[] };
}

export function richTextToParagraphs(richText: unknown): string[] {
  if (!richText) return [];
  if (typeof richText === "string") return [richText];
  try {
    const rt = richText as LexicalRichText;
    return (rt.root?.children ?? [])
      .map((block) => (block.children ?? []).map((n) => n.text ?? "").join(""))
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function richTextToPlainText(richText: unknown): string {
  return richTextToParagraphs(richText).join(" ");
}
