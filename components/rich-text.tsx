import { Fragment, type ReactNode } from "react";

// Renders the admin's simple formatting as React elements (never raw HTML):
// blank line = new paragraph, "## " heading, "- " bullet list, [text](link) for links.

const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/|#)/i;

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const [, label, href] = match;
    parts.push(SAFE_HREF.test(href)
      ? <a key={index} href={href} {...(/^https?:/i.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</a>
      : label);
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** Keeps single line breaks inside a paragraph. */
export function MultiLine({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  return <>{lines.map((line, i) => <Fragment key={i}>{i > 0 ? <br /> : null}{inline(line)}</Fragment>)}</>;
}

/** Paragraphs separated by blank lines. */
export function Paragraphs({ text }: { text: string }) {
  return <>{text.split(/\r?\n\s*\r?\n/).map((block) => block.trim()).filter(Boolean).map((block, i) => <p key={i}><MultiLine text={block} /></p>)}</>;
}

export function RichText({ text }: { text: string }) {
  const blocks = text.split(/\r?\n\s*\r?\n/).map((block) => block.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) return <h2 key={i}>{inline(block.slice(3).trim())}</h2>;
        const lines = block.split(/\r?\n/);
        if (lines.every((line) => line.trim().startsWith("- "))) {
          return <ul key={i}>{lines.map((line, j) => <li key={j}>{inline(line.trim().slice(2))}</li>)}</ul>;
        }
        return <p key={i}><MultiLine text={block} /></p>;
      })}
    </>
  );
}
