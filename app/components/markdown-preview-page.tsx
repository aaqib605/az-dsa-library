"use client";

import { type ReactNode, useMemo, useState } from "react";

type MarkdownBlock =
  | { content: string; language: string; type: "code" }
  | { items: string[]; ordered: boolean; type: "list" }
  | { level: number; text: string; type: "heading" }
  | { rows: string[][]; type: "table"; headers: string[] }
  | { text: string; type: "math" }
  | { text: string; type: "paragraph" }
  | { text: string; type: "quote" };

const sampleMarkdown = `# Arrays Introduction

Arrays store values in contiguous positions. This makes **index-based access** fast and predictable for beginner DSA problems.

## Why arrays matter

- Access an element with \`arr[index]\`
- Traverse from left to right
- Track counts, sums, minimums, and maximums
- Watch for off-by-one boundaries

## C++ example

\`\`\`cpp
int findMax(vector<int>& nums) {
    int answer = nums[0];

    for (int value : nums) {
        answer = max(answer, value);
    }

    return answer;
}
\`\`\`

## Complexity table

| Operation | Time | Notes |
| --- | --- | --- |
| Access by index | O(1) | Direct lookup |
| Linear scan | O(n) | Visit each item once |
| Insert at front | O(n) | Shift existing elements |

## Math note

The valid index range is $0 \\le i < n$.

$$
sum = a_0 + a_1 + ... + a_{n - 1}
$$

> [!TIP]
> Trace the smallest input and the largest input before finalizing the implementation.

## Quiz

1. What is the first valid index in a zero-indexed array?
2. What is the time complexity of scanning each element once?

## Practice problems

- [Running Sum](https://leetcode.com/)
- [Maximum Element](https://leetcode.com/)
`;

function isTableDivider(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line);
}

function isSpecialLine(line: string) {
  return (
    line.startsWith("#") ||
    line.startsWith("```") ||
    line.startsWith("$$") ||
    line.startsWith(">") ||
    /^[-*]\s+/.test(line) ||
    /^\d+\.\s+/.test(line) ||
    (line.includes("|") && isTableDivider(line))
  );
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim() || "text";
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push({
        content: codeLines.join("\n"),
        language,
        type: "code",
      });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("$$")) {
      const mathLines: string[] = [];
      const inlineMath = trimmed.replace(/^\$\$/, "").replace(/\$\$$/, "");

      if (inlineMath) {
        mathLines.push(inlineMath);
      }

      index += 1;
      while (index < lines.length && !lines[index].trim().endsWith("$$")) {
        mathLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        const closingLine = lines[index].trim().replace(/\$\$$/, "");
        if (closingLine) {
          mathLines.push(closingLine);
        }
        index += 1;
      }

      blocks.push({ text: mathLines.join("\n").trim(), type: "math" });
      continue;
    }

    const headingMatch = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      blocks.push({
        level: headingMatch[1].length,
        text: headingMatch[2],
        type: "heading",
      });
      index += 1;
      continue;
    }

    if (trimmed.includes("|") && isTableDivider(lines[index + 1]?.trim() ?? "")) {
      const headers = parseTableRow(trimmed);
      const rows: string[][] = [];
      index += 2;

      while (index < lines.length && lines[index].includes("|")) {
        rows.push(parseTableRow(lines[index]));
        index += 1;
      }

      blocks.push({ headers, rows, type: "table" });
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push({ text: quoteLines.join("\n"), type: "quote" });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const ordered = /^\d+\.\s+/.test(trimmed);
      const items: string[] = [];
      const itemPattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;

      while (index < lines.length && itemPattern.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(itemPattern, ""));
        index += 1;
      }

      blocks.push({ items, ordered, type: "list" });
      continue;
    }

    const paragraphLines: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !isSpecialLine(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ text: paragraphLines.join(" "), type: "paragraph" });
  }

  return blocks;
}

function splitLinkToken(token: string) {
  const closingLabelIndex = token.indexOf("](");

  return {
    href: token.slice(closingLabelIndex + 2, -1),
    label: token.slice(token.startsWith("!") ? 2 : 1, closingLabelIndex),
  };
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(!?\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\$[^$]+\$)/g);

  return parts
    .filter(Boolean)
    .map((part, index) => {
      const key = `${part}-${index}`;

      if (part.startsWith("![") && part.includes("](")) {
        const { href, label } = splitLinkToken(part);

        return (
          <span
            className="my-3 block rounded-lg border border-dashed border-slate-700 bg-slate-950 p-4 font-mono text-xs text-slate-500"
            key={key}
          >
            Image: {label || "Untitled"} / {href}
          </span>
        );
      }

      if (part.startsWith("[") && part.includes("](")) {
        const { href, label } = splitLinkToken(part);

        return (
          <a
            className="text-emerald-300 underline decoration-emerald-400/40 underline-offset-4 transition-colors hover:text-emerald-200"
            href={href}
            key={key}
            rel="noreferrer"
            target="_blank"
          >
            {label}
          </a>
        );
      }

      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 font-mono text-[0.9em] text-sky-200"
            key={key}
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={key}>{part.slice(2, -2)}</strong>;
      }

      if (part.startsWith("$") && part.endsWith("$")) {
        return (
          <span
            className="rounded border border-sky-400/20 bg-sky-400/10 px-1.5 py-0.5 font-mono text-[0.9em] text-sky-200"
            key={key}
          >
            {part.slice(1, -1)}
          </span>
        );
      }

      return part;
    });
}

function MarkdownPreview({ blocks }: { blocks: MarkdownBlock[] }) {
  if (blocks.length === 0) {
    return (
      <div className="flex min-h-96 items-center justify-center rounded-lg border border-dashed border-slate-800 bg-slate-950/50 p-8 text-center">
        <div>
          <p className="text-sm font-medium text-slate-300">Nothing to preview</p>
          <p className="mt-2 text-sm text-slate-500">
            Paste markdown into the editor to render it here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="rounded-lg border border-slate-800 bg-slate-950/60 p-5">
      <div className="space-y-6">
        {blocks.map((block, index) => (
          <MarkdownBlockView block={block} key={`${block.type}-${index}`} />
        ))}
      </div>
    </article>
  );
}

function MarkdownBlockView({ block }: { block: MarkdownBlock }) {
  if (block.type === "heading") {
    const HeadingTag =
      block.level === 1
        ? "h1"
        : block.level === 2
          ? "h2"
          : block.level === 3
            ? "h3"
            : "h4";
    const className =
      block.level === 1
        ? "text-3xl font-bold tracking-normal text-slate-50"
        : block.level === 2
          ? "border-b border-slate-800 pb-2 text-2xl font-semibold tracking-normal text-slate-100"
          : "text-xl font-semibold tracking-normal text-slate-100";

    return <HeadingTag className={className}>{renderInline(block.text)}</HeadingTag>;
  }

  if (block.type === "paragraph") {
    return <p className="text-sm leading-7 text-slate-300">{renderInline(block.text)}</p>;
  }

  if (block.type === "list") {
    const ListTag = block.ordered ? "ol" : "ul";

    return (
      <ListTag
        className={[
          "grid gap-2 pl-5 text-sm leading-6 text-slate-300",
          block.ordered ? "list-decimal" : "list-disc marker:text-emerald-400",
        ].join(" ")}
      >
        {block.items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ListTag>
    );
  }

  if (block.type === "code") {
    return (
      <div className="overflow-hidden rounded-lg border border-slate-800 bg-[#070a0f]">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <span className="text-sm font-medium text-slate-300">Code block</span>
          <span className="rounded border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-[11px] text-slate-400">
            {block.language}
          </span>
        </div>
        <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-300">
          <code>{block.content}</code>
        </pre>
      </div>
    );
  }

  if (block.type === "table") {
    return (
      <div className="overflow-hidden rounded-lg border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                {block.headers.map((header) => (
                  <th className="border-b border-slate-800 px-4 py-3 font-semibold" key={header}>
                    {renderInline(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-400">
              {block.rows.map((row, rowIndex) => (
                <tr className="bg-slate-950/70" key={`${row.join("-")}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td className="px-4 py-3" key={`${cell}-${cellIndex}`}>
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (block.type === "math") {
    return (
      <div className="overflow-x-auto rounded-lg border border-sky-400/20 bg-sky-400/10 p-4">
        <pre className="font-mono text-sm leading-6 text-sky-100">{block.text}</pre>
      </div>
    );
  }

  return (
    <blockquote className="rounded-lg border border-sky-400/30 bg-sky-400/10 p-4 text-sm leading-7 text-slate-200">
      {block.text.split("\n").map((line) => (
        <p key={line}>{renderInline(line)}</p>
      ))}
    </blockquote>
  );
}

export function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const blocks = useMemo(() => parseMarkdown(markdown), [markdown]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#090d12]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="border-b border-slate-800/80 pb-8">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 font-mono text-xs uppercase tracking-normal text-emerald-300">
                Markdown Preview
              </span>
              <span className="font-mono text-xs text-slate-500">
                Mock renderer / local preview
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-normal text-slate-50 sm:text-4xl">
              Markdown Renderer
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
              Paste topic markdown and inspect how structure, code, tables,
              math notes, links, and review blocks read inside the DSA Library
              preview shell.
            </p>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
          <div className="flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-950/60 xl:sticky xl:top-20 xl:h-[calc(100vh-6rem)]">
            <div className="flex flex-col gap-3 border-b border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
                  Source
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-normal text-slate-100">
                  Markdown input
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-emerald-400/40 hover:bg-slate-800 hover:text-emerald-300"
                  onClick={() => setMarkdown(sampleMarkdown)}
                  type="button"
                >
                  Load sample
                </button>
                <button
                  className="rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-100"
                  onClick={() => setMarkdown("")}
                  type="button"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              aria-label="Markdown input"
              className="h-[680px] min-h-[680px] w-full flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-6 text-slate-300 outline-none placeholder:text-slate-700 [scrollbar-color:#334155_#020617] [scrollbar-width:thin] xl:h-auto xl:min-h-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-950 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700"
              onChange={(event) => setMarkdown(event.target.value)}
              placeholder="Paste markdown here..."
              spellCheck={false}
              value={markdown}
            />
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
                  Rendered output
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-normal text-slate-100">
                  Learner-facing preview
                </h2>
              </div>
              <span className="rounded border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-400">
                Live
              </span>
            </div>
            <MarkdownPreview blocks={blocks} />
          </div>
        </section>
      </div>
    </div>
  );
}
