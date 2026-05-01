import Link from "next/link";

import type {
  DashboardTopic,
  DashboardTrack,
  TrackStatus,
} from "@/lib/mock-data";

const statusClasses: Record<TrackStatus, string> = {
  Draft: "border-slate-600 bg-slate-800/70 text-slate-300",
  "In Review": "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Published: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Ready: "border-sky-400/30 bg-sky-400/10 text-sky-300",
};

function BackLink() {
  return (
    <Link
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-200"
      href="/dashboard"
    >
      <span aria-hidden="true" className="font-mono">
        &lt;-
      </span>
      All tracks
    </Link>
  );
}

function TrackHeader({ track }: { track: DashboardTrack }) {
  return (
    <header className="border-b border-slate-800/80 pb-8">
      <BackLink />

      <div className="mt-8 max-w-3xl">
        <span className="rounded border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-[11px] uppercase tracking-normal text-slate-400">
          {track.level}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-normal text-slate-50 sm:text-4xl">
          {track.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
          {track.description}
        </p>
      </div>
    </header>
  );
}

function TrackSummary({
  topics,
  track,
}: {
  topics: DashboardTopic[];
  track: DashboardTrack;
}) {
  const readyCount = topics.filter(
    (topic) => topic.status === "Ready" || topic.status === "Published",
  ).length;
  const reviewCount = topics.filter((topic) => topic.status === "In Review")
    .length;

  return (
    <section
      aria-label={`${track.name} summary`}
      className="grid gap-4 sm:grid-cols-3"
    >
      <SummaryCard
        helper="Mock topic records"
        label="Topics"
        value={topics.length.toString()}
      />
      <SummaryCard
        helper="Ready or published"
        label="Preview Ready"
        value={readyCount.toString()}
      />
      <SummaryCard
        helper="Needs content pass"
        label="In Review"
        value={reviewCount.toString()}
      />
    </section>
  );
}

function SummaryCard({
  helper,
  label,
  value,
}: {
  helper: string;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
      <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-normal text-slate-50">
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">{helper}</p>
    </article>
  );
}

function TopicList({
  topics,
  track,
}: {
  topics: DashboardTopic[];
  track: DashboardTrack;
}) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
            Topic list
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-normal text-slate-100">
            {track.level} curriculum
          </h2>
        </div>
        <span className="w-fit rounded border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-400">
          {topics.length} topics
        </span>
      </div>

      {topics.length > 0 ? (
        <div className="grid gap-3">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <EmptyTopics />
      )}
    </section>
  );
}

function TopicCard({ topic }: { topic: DashboardTopic }) {
  return (
    <Link
      className="group grid gap-4 rounded-lg border border-slate-800 bg-slate-950 p-4 transition-colors hover:border-slate-700 hover:bg-slate-900/70 md:grid-cols-[56px_minmax(0,1fr)_auto]"
      href={`/tracks/${topic.trackSlug}/${topic.slug}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-800 bg-slate-900 font-mono text-sm text-slate-500 group-hover:text-slate-300">
        {String(topic.orderIndex).padStart(2, "0")}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-base font-semibold tracking-normal text-slate-100">
            {topic.title}
          </h3>
          <span
            className={`rounded border px-2 py-1 font-mono text-[11px] ${statusClasses[topic.status]}`}
          >
            {topic.status}
          </span>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
          {topic.description}
        </p>

        <div className="mt-4 flex flex-col gap-2 font-mono text-xs text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon />
            {topic.duration}
          </span>
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <FileIcon />
            <span className="truncate">{topic.markdownPath}</span>
          </span>
        </div>
      </div>

      <span className="self-center justify-self-start font-mono text-sm text-slate-500 transition-colors group-hover:text-emerald-300 md:justify-self-end">
        preview -&gt;
      </span>
    </Link>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

function EmptyTopics() {
  return (
    <div className="rounded-lg border border-dashed border-slate-800 bg-slate-950/70 p-8 text-center">
      <p className="text-sm font-medium text-slate-300">No topics indexed</p>
      <p className="mt-2 text-sm text-slate-500">
        This track does not have mock topic data yet.
      </p>
    </div>
  );
}

export function TrackDetailPage({
  topics,
  track,
}: {
  topics: DashboardTopic[];
  track: DashboardTrack;
}) {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#090d12]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <TrackHeader track={track} />
        <TrackSummary topics={topics} track={track} />
        <TopicList topics={topics} track={track} />
      </div>
    </div>
  );
}
