import type { Metadata } from "next";

import { GithubSyncPage } from "@/app/components/github-sync-page";

export const metadata: Metadata = {
  title: "GitHub Sync | AZ DSA Library",
  description: "Mock GitHub content sync dashboard for DSA Library files.",
};

export default function SyncRoute() {
  return <GithubSyncPage />;
}
