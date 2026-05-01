import Link from "next/link";

import {
  dashboardTracks,
  type DashboardTrack,
} from "@/lib/mock-data";

const totalTopics = dashboardTracks.reduce(
  (sum, track) => sum + track.topicCount,
  0,
);
const readyTopics = dashboardTracks.reduce(
  (sum, track) => sum + track.readyCount,
  0,
);
const needsReview = dashboardTracks
  .filter((track) => track.status !== "Ready" && track.status !== "Published")
  .reduce((sum, track) => sum + track.topicCount, 0);

const statCards = [
  {
    label: "Total Tracks",
    value: dashboardTracks.length.toString(),
    helper: "Beginner to advanced paths",
    badge: "Catalog",
    icon: "layers",
  },
  {
    label: "Total Topics",
    value: totalTopics.toString(),
    helper: "Indexed mock curriculum nodes",
    badge: "Mock data",
    icon: "list",
  },
  {
    label: "Ready for Preview",
    value: readyTopics.toString(),
    helper: "Topics with learner-facing content",
    badge: `${Math.round((readyTopics / totalTopics) * 100)}% ready`,
    icon: "check",
  },
  {
    label: "Needs Review",
    value: needsReview.toString(),
    helper: "Items waiting on internal pass",
    badge: "Review",
    icon: "alert",
  },
];

function Icon({ name }: { name: string }) {
  if (name === "check") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
        viewBox="0 0 24 24"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  if (name === "alert") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
        viewBox="0 0 24 24"
      >
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      </svg>
    );
  }

  if (name === "list") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
        viewBox="0 0 24 24"
      >
        <path d="M8 6h13" />
        <path d="M8 12h13" />
        <path d="M8 18h13" />
        <path d="M3 6h.01" />
        <path d="M3 12h.01" />
        <path d="M3 18h.01" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
    >
      <path d="M12 2 3 7l9 5 9-5-9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

function DashboardHeader() {
  return (
    <section className="border-b border-slate-800/80 pb-8">
      <div className="max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 font-mono text-xs uppercase tracking-normal text-emerald-300">
            Internal Preview
          </span>
          <span className="font-mono text-xs text-slate-500">
            Last updated: Today, 4:10 PM
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-normal text-slate-50 sm:text-4xl">
          DSA Library Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
          Manage tracks, preview topic content, and monitor content readiness
          for the DSA Library.
        </p>
      </div>

    </section>
  );
}

function DashboardStatsGrid() {
  return (
    <section
      aria-label="Dashboard summary"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {statCards.map((stat) => (
        <DashboardStatCard
          badge={stat.badge}
          helper={stat.helper}
          icon={stat.icon}
          key={stat.label}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </section>
  );
}

function DashboardStatCard({
  badge,
  helper,
  icon,
  label,
  value,
}: {
  badge: string;
  helper: string;
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-black/20">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-normal text-slate-500">
          {label}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-400">
          <Icon name={icon} />
        </span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold tracking-normal text-slate-50">
          {value}
        </p>
        <span className="rounded border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-[11px] text-slate-400">
          {badge}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">{helper}</p>
    </article>
  );
}

function TracksOverview() {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
            Tracks
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-normal text-slate-100">
            Available DSA paths
          </h2>
        </div>
        <span className="w-fit rounded border border-slate-700 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-400">
          {dashboardTracks.length} tracks indexed
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {dashboardTracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </section>
  );
}

function TrackCard({ track }: { track: DashboardTrack }) {
  const readiness = Math.round((track.readyCount / track.topicCount) * 100);

  return (
    <article className="group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-4 transition-colors hover:border-slate-700">
      <div
        className={`absolute inset-x-0 top-0 h-24 bg-linear-to-b ${track.accentClassName}`}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded border border-slate-700 bg-slate-900/80 px-2 py-1 font-mono text-[11px] uppercase tracking-normal text-slate-400">
            {track.level}
          </span>
          <span className="rounded border border-slate-700 bg-slate-900/80 px-2 py-1 font-mono text-[11px] text-slate-300">
            {track.status}
          </span>
        </div>

        <h3 className="mt-5 text-lg font-semibold tracking-normal text-slate-100">
          {track.name}
        </h3>
        <p className="mt-2 min-h-18 text-sm leading-6 text-slate-400">
          {track.description}
        </p>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between font-mono text-xs text-slate-500">
            <span>{track.readyCount} ready</span>
            <span>{track.topicCount} topics</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-400"
              style={{ width: `${readiness}%` }}
            />
          </div>
        </div>

        <Link
          className="mt-5 inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-emerald-400/40 hover:bg-slate-800 hover:text-emerald-300"
          href={`/tracks/${track.slug}`}
        >
          Open Track
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </article>
  );
}

export function DashboardMainContent() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#090d12]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />
        <DashboardStatsGrid />
        <TracksOverview />
      </div>
    </div>
  );
}
