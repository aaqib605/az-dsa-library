import { FileText, GitBranch, RefreshCw } from "lucide-react";

type SyncState = "Failed" | "Pending" | "Synced";
type TopicState = "Draft" | "In Review" | "Published";
type ActivityState = "Failed" | "Pending" | "Success";

interface SyncedFile {
  id: string;
  path: string;
  track: string;
  syncState: SyncState;
  lastSync: string;
  topicState: TopicState;
  commit: string;
}

interface SyncActivity {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  state: ActivityState;
}

const repository = {
  name: "org/dsa-content",
  provider: "GitHub",
  branch: "main",
  commit: "9f4c2a1",
  lastSync: "Today, 4:10 PM",
  status: "Healthy",
};

const syncedFiles: SyncedFile[] = [
  {
    id: "arrays",
    path: "content/beginner-dsa/arrays-introduction/index.mdx",
    track: "Beginner",
    syncState: "Pending",
    lastSync: "-",
    topicState: "Published",
    commit: "-",
  },
  {
    id: "strings",
    path: "content/beginner-dsa/strings/index.mdx",
    track: "Beginner",
    syncState: "Synced",
    lastSync: "2h ago",
    topicState: "In Review",
    commit: "c810ac4",
  },
  {
    id: "recursion",
    path: "content/intermediate-dsa/recursion/index.mdx",
    track: "Intermediate",
    syncState: "Synced",
    lastSync: "3h ago",
    topicState: "Draft",
    commit: "74aa01b",
  },
  {
    id: "binary-search",
    path: "content/intermediate-dsa/binary-search/index.mdx",
    track: "Intermediate",
    syncState: "Failed",
    lastSync: "4h ago",
    topicState: "In Review",
    commit: "0df4b79",
  },
  {
    id: "graphs",
    path: "content/advanced-dsa/graphs/index.mdx",
    track: "Advanced",
    syncState: "Synced",
    lastSync: "5h ago",
    topicState: "Published",
    commit: "21b2e44",
  },
  {
    id: "dp",
    path: "content/advanced-dsa/dynamic-programming/index.mdx",
    track: "Advanced",
    syncState: "Synced",
    lastSync: "6h ago",
    topicState: "Published",
    commit: "a17d3c0",
  },
];

const syncActivity: SyncActivity[] = [
  {
    id: "manual-sync",
    title: "Manual sync queued",
    detail: "2 pending files are waiting for the next mock sync pass.",
    timestamp: "4 min ago",
    state: "Pending",
  },
  {
    id: "content-indexed",
    title: "Markdown index refreshed",
    detail: "6 files detected across beginner, intermediate, and advanced tracks.",
    timestamp: "2h ago",
    state: "Success",
  },
  {
    id: "binary-search-error",
    title: "Binary search file needs review",
    detail: "Mock sync flagged a stale commit reference for the topic file.",
    timestamp: "4h ago",
    state: "Failed",
  },
];

const syncedCount = syncedFiles.filter((file) => file.syncState === "Synced").length;
const pendingCount = syncedFiles.filter((file) => file.syncState === "Pending").length;
const failedCount = syncedFiles.filter((file) => file.syncState === "Failed").length;

const syncStateClasses: Record<SyncState, string> = {
  Failed: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  Pending: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  Synced: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
};

const topicStateClasses: Record<TopicState, string> = {
  Draft: "border-slate-600 bg-slate-800/80 text-slate-300",
  "In Review": "border-amber-400/40 bg-amber-400/10 text-amber-300",
  Published: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
};

const activityStateClasses: Record<ActivityState, string> = {
  Failed: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  Pending: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  Success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
};

function StatusBadge<TStatus extends string>({
  classNames,
  status,
}: {
  classNames: Record<TStatus, string>;
  status: TStatus;
}) {
  return (
    <span
      className={`inline-flex w-fit rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-normal ${classNames[status]}`}
    >
      {status}
    </span>
  );
}

function SyncHeader() {
  return (
    <header className="border-b border-slate-800/80 pb-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 font-mono text-xs uppercase tracking-normal text-emerald-300">
              Admin / Sync
            </span>
            <span className="font-mono text-xs text-slate-500">
              Mock data only
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-normal text-slate-50 sm:text-4xl">
            GitHub Sync
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            Inspect repository status, markdown files, and mock sync activity
            before wiring this dashboard to a real GitHub content source.
          </p>
        </div>

        <button
          className="inline-flex w-fit items-center gap-2 rounded-md border border-emerald-300/40 bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm shadow-emerald-950/30 transition-colors hover:bg-emerald-300"
          type="button"
        >
          <RefreshCw aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} />
          Sync now
        </button>
      </div>
    </header>
  );
}

function RepositorySummary() {
  return (
    <section
      aria-label="Repository sync summary"
      className="grid gap-4 md:grid-cols-3"
    >
      <SummaryCard
        helper={repository.provider}
        icon={<GitBranch aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.9} />}
        label="Repository"
        value={repository.name}
      />
      <SummaryCard
        helper={`${pendingCount} pending / ${failedCount} failed`}
        icon={<FileText aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.9} />}
        label="Synced files"
        value={`${syncedCount} / ${syncedFiles.length}`}
      />
      <SummaryCard
        helper={`Commit ${repository.commit}`}
        icon={<GitBranch aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.9} />}
        label="Branch"
        value={repository.branch}
      />
    </section>
  );
}

function SummaryCard({
  helper,
  icon,
  label,
  value,
}: {
  helper: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-normal text-slate-500">
        <span className="text-slate-600">{icon}</span>
        {label}
      </div>
      <p className="mt-3 break-words text-xl font-semibold tracking-normal text-slate-50">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">{helper}</p>
    </article>
  );
}

function FileTable() {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/50">
      <div className="flex flex-col gap-2 border-b border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
            Detected content
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-normal text-slate-100">
            Markdown files
          </h2>
        </div>
        <span className="w-fit rounded border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-400">
          {syncedFiles.length} files indexed
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead className="bg-slate-900/70 text-slate-500">
            <tr className="font-mono text-[11px] uppercase tracking-normal">
              <th className="px-4 py-3 font-medium">Path</th>
              <th className="px-4 py-3 font-medium">Track</th>
              <th className="px-4 py-3 font-medium">Sync</th>
              <th className="px-4 py-3 font-medium">Last sync</th>
              <th className="px-4 py-3 font-medium">Commit</th>
              <th className="px-4 py-3 font-medium">Topic status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {syncedFiles.map((file) => (
              <tr className="bg-slate-950/40" key={file.id}>
                <td className="max-w-[360px] px-4 py-4">
                  <span className="block truncate font-mono text-sm font-medium text-slate-200">
                    {file.path}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-400">{file.track}</td>
                <td className="px-4 py-4">
                  <StatusBadge
                    classNames={syncStateClasses}
                    status={file.syncState}
                  />
                </td>
                <td className="px-4 py-4 font-mono text-xs text-slate-500">
                  {file.lastSync}
                </td>
                <td className="px-4 py-4 font-mono text-xs text-slate-500">
                  {file.commit}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge
                    classNames={topicStateClasses}
                    status={file.topicState}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ActivityList() {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
            Activity
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-normal text-slate-100">
            Recent sync events
          </h2>
        </div>
        <span className="w-fit rounded border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-400">
          Last sync {repository.lastSync}
        </span>
      </div>

      <div className="grid gap-3">
        {syncActivity.map((activity) => (
          <article
            className="grid gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4 sm:grid-cols-[minmax(0,1fr)_auto]"
            key={activity.id}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-sm font-semibold text-slate-100">
                  {activity.title}
                </h3>
                <StatusBadge
                  classNames={activityStateClasses}
                  status={activity.state}
                />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {activity.detail}
              </p>
            </div>
            <span className="font-mono text-xs text-slate-500 sm:justify-self-end">
              {activity.timestamp}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GithubSyncPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#090d12]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <SyncHeader />
        <RepositorySummary />
        <FileTable />
        <ActivityList />
      </div>
    </div>
  );
}
