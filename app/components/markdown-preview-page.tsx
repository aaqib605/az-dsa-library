"use client";

import { isValidElement, useState, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type CodeElementProps = {
  children?: ReactNode;
  className?: string;
};

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

const markdownSanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [["className", /^language-./, "math-inline", "math-display"]],
  },
};

function getCodeBlockLanguage(children: ReactNode) {
  if (!isValidElement<CodeElementProps>(children)) {
    return "text";
  }

  const className = children.props.className ?? "";
  const languageMatch = /language-(\S+)/.exec(className);

  return languageMatch?.[1] ?? "text";
}

function MarkdownPreview({ markdown }: { markdown: string }) {
  if (!markdown.trim()) {
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
      <ReactMarkdown
        components={markdownComponents}
        rehypePlugins={[
          [rehypeSanitize, markdownSanitizeSchema],
          rehypeKatex,
        ]}
        remarkPlugins={[remarkGfm, remarkMath]}
        skipHtml
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}

const markdownComponents: Components = {
  a({ children, href, ...props }) {
    return (
      <a
        className="text-emerald-300 underline decoration-emerald-400/40 underline-offset-4 transition-colors hover:text-emerald-200"
        href={href}
        rel="noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  },
  blockquote({ children, ...props }) {
    return (
      <blockquote
        className="rounded-lg border border-sky-400/30 bg-sky-400/10 p-4 text-sm leading-7 text-slate-200"
        {...props}
      >
        {children}
      </blockquote>
    );
  },
  code({ children, className, ...props }) {
    const isBlockCode = className?.startsWith("language-");

    if (isBlockCode) {
      return (
        <code className="block whitespace-pre font-mono text-sm text-slate-300" {...props}>
          {children}
        </code>
      );
    }

    return (
      <code
        className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 font-mono text-[0.9em] text-sky-200"
        {...props}
      >
        {children}
      </code>
    );
  },
  h1({ children, ...props }) {
    return (
      <h1 className="text-3xl font-bold tracking-normal text-slate-50" {...props}>
        {children}
      </h1>
    );
  },
  h2({ children, ...props }) {
    return (
      <h2
        className="border-b border-slate-800 pb-2 text-2xl font-semibold tracking-normal text-slate-100"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3({ children, ...props }) {
    return (
      <h3 className="text-xl font-semibold tracking-normal text-slate-100" {...props}>
        {children}
      </h3>
    );
  },
  h4({ children, ...props }) {
    return (
      <h4 className="text-lg font-semibold tracking-normal text-slate-100" {...props}>
        {children}
      </h4>
    );
  },
  img({ alt, src, ...props }) {
    const imageSource = typeof src === "string" ? src : "";

    return (
      <span
        className="my-3 block rounded-lg border border-dashed border-slate-700 bg-slate-950 p-4 font-mono text-xs text-slate-500"
        {...props}
      >
        Image: {alt || "Untitled"} / {imageSource || "No source"}
      </span>
    );
  },
  li({ children, ...props }) {
    return <li {...props}>{children}</li>;
  },
  ol({ children, ...props }) {
    return (
      <ol className="grid list-decimal gap-2 pl-5 text-sm leading-6 text-slate-300" {...props}>
        {children}
      </ol>
    );
  },
  p({ children, ...props }) {
    return (
      <p className="text-sm leading-7 text-slate-300" {...props}>
        {children}
      </p>
    );
  },
  pre({ children }) {
    const language = getCodeBlockLanguage(children);

    return (
      <div className="overflow-hidden rounded-lg border border-slate-800 bg-[#070a0f]">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <span className="text-sm font-medium text-slate-300">Code block</span>
          <span className="rounded border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-[11px] text-slate-400">
            {language}
          </span>
        </div>
        <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-300">
          {children}
        </pre>
      </div>
    );
  },
  strong({ children, ...props }) {
    return (
      <strong className="font-semibold text-slate-100" {...props}>
        {children}
      </strong>
    );
  },
  table({ children, ...props }) {
    return (
      <div className="overflow-hidden rounded-lg border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm" {...props}>
            {children}
          </table>
        </div>
      </div>
    );
  },
  tbody({ children, ...props }) {
    return (
      <tbody className="divide-y divide-slate-800 text-slate-400" {...props}>
        {children}
      </tbody>
    );
  },
  td({ children, ...props }) {
    return (
      <td className="px-4 py-3" {...props}>
        {children}
      </td>
    );
  },
  th({ children, ...props }) {
    return (
      <th className="border-b border-slate-800 px-4 py-3 font-semibold" {...props}>
        {children}
      </th>
    );
  },
  thead({ children, ...props }) {
    return (
      <thead className="bg-slate-900 text-slate-300" {...props}>
        {children}
      </thead>
    );
  },
  tr({ children, ...props }) {
    return (
      <tr className="bg-slate-950/70" {...props}>
        {children}
      </tr>
    );
  },
  ul({ children, ...props }) {
    return (
      <ul
        className="grid list-disc gap-2 pl-5 text-sm leading-6 text-slate-300 marker:text-emerald-400"
        {...props}
      >
        {children}
      </ul>
    );
  },
};

export function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);

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
                Library renderer / local preview
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
            <MarkdownPreview markdown={markdown} />
          </div>
        </section>
      </div>
    </div>
  );
}
