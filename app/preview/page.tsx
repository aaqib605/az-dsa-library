import type { Metadata } from "next";

import { MarkdownPreviewPage } from "@/app/components/markdown-preview-page";

export const metadata: Metadata = {
  title: "Markdown Renderer | AZ DSA Library",
  description: "Internal markdown preview page for DSA Library content.",
};

export default function PreviewRoute() {
  return <MarkdownPreviewPage />;
}
