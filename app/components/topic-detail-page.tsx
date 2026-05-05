import Link from "next/link";

import type {
  DashboardTopic,
  DashboardTrack,
  TopicPracticeProblem,
  TopicPreviewContent,
  TopicQuizQuestion,
  TrackStatus,
} from "@/lib/mock-data";

const statusClasses: Record<TrackStatus, string> = {
  Draft: "border-slate-600 bg-slate-800/70 text-slate-300",
  "In Review": "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Published: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Ready: "border-sky-400/30 bg-sky-400/10 text-sky-300",
};

const difficultyClasses: Record<TopicPracticeProblem["difficulty"], string> = {
  Easy: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Hard: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-300",
};

function TopicHeader({
  topic,
  track,
}: {
  topic: DashboardTopic;
  track: DashboardTrack;
}) {
  return (
    <header className="border-b border-slate-800/80 pb-8">
      <Link
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-200 lg:hidden"
        href={`/tracks/${track.slug}`}
      >
        <span aria-hidden="true" className="font-mono">
          &lt;-
        </span>
        {track.name}
      </Link>

      <div className="mt-8 max-w-3xl lg:mt-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-[11px] uppercase tracking-normal text-slate-400">
            {track.level}
          </span>
          <span
            className={`rounded border px-2 py-1 font-mono text-[11px] ${statusClasses[topic.status]}`}
          >
            {topic.status}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-normal text-slate-50 sm:text-4xl">
          {topic.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
          {topic.description}
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <MetadataItem label="Duration" value={topic.duration} />
        <MetadataItem label="Content file" value={topic.markdownPath} />
        <MetadataItem
          label="Topic order"
          value={String(topic.orderIndex).padStart(2, "0")}
        />
      </div>
    </header>
  );
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
      <p className="font-mono text-[11px] uppercase tracking-normal text-slate-500">
        {label}
      </p>
      <p className="mt-1 truncate font-mono text-sm text-slate-300">{value}</p>
    </div>
  );
}

function TrackTopicRail({
  currentTopic,
  topics,
  track,
}: {
  currentTopic: DashboardTopic;
  topics: DashboardTopic[];
  track: DashboardTrack;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-200"
          href={`/tracks/${track.slug}`}
        >
          <span aria-hidden="true" className="font-mono">
            &lt;-
          </span>
          {track.name}
        </Link>

        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
            {track.level} DSA
          </p>
          <nav
            aria-label={`${track.name} topics`}
            className="mt-3 grid gap-1.5"
          >
            {topics.map((topic) => {
              const active = topic.slug === currentTopic.slug;

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={[
                    "group rounded-lg border px-3 py-3 transition-colors",
                    active
                      ? "border-emerald-400/30 bg-emerald-400/10"
                      : "border-transparent hover:border-slate-800 hover:bg-slate-950/70",
                  ].join(" ")}
                  href={`/tracks/${topic.trackSlug}/topics/${topic.slug}`}
                  key={topic.id}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500">
                      {String(topic.orderIndex).padStart(2, "0")}
                    </span>
                    <span
                      className={[
                        "min-w-0 flex-1 truncate text-sm font-medium",
                        active
                          ? "text-slate-100"
                          : "text-slate-400 group-hover:text-slate-200",
                      ].join(" ")}
                    >
                      {topic.title}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`rounded border px-2 py-1 font-mono text-[10px] ${statusClasses[topic.status]}`}
                    >
                      {topic.status}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}

function ExplanationPanel({
  content,
  topic,
}: {
  content: TopicPreviewContent;
  topic: DashboardTopic;
}) {
  return (
    <article
      className="rounded-lg border border-slate-800 bg-slate-950/60 p-5"
      id="topic-explanation"
    >
      <SectionHeading eyebrow="Preview" title="Topic explanation" />

      <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
        {content.overview.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-base font-semibold tracking-normal text-slate-100">
          Key ideas
        </h3>
        <ul className="mt-3 grid gap-2 text-sm text-slate-400">
          {content.keyPoints.map((point) => (
            <li className="flex gap-2" key={point}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-800 bg-[#070a0f]">
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
          <p className="text-sm font-medium text-slate-200">
            {content.codeExample.title}
          </p>
          <span className="rounded border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-[11px] text-slate-400">
            {content.codeExample.language}
          </span>
        </div>
        <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-300">
          <code>{content.codeExample.code}</code>
        </pre>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <ComplexityItem label="Time" value={content.complexity.time} />
        <ComplexityItem label="Space" value={content.complexity.space} />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        {content.complexity.note}
      </p>

      <p className="mt-6 font-mono text-xs text-slate-600">
        Source: {topic.markdownPath}
      </p>
    </article>
  );
}

function ComplexityItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
      <p className="font-mono text-[11px] uppercase tracking-normal text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-mono text-lg font-semibold text-slate-100">
        {value}
      </p>
    </div>
  );
}

function VideoPanel({ content }: { content: TopicPreviewContent }) {
  const ready = content.video.status === "Ready";

  return (
    <section
      className="rounded-lg border border-slate-800 bg-slate-950/60 p-4"
      id="video-readiness"
    >
      <SectionHeading eyebrow="Video" title="Content readiness" />
      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-200">
              {content.video.title}
            </p>
            <p className="mt-1 font-mono text-xs text-slate-500">
              {content.video.provider} / {content.video.duration}
            </p>
          </div>
          <span
            className={[
              "rounded border px-2 py-1 font-mono text-[11px]",
              ready
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : "border-amber-400/30 bg-amber-400/10 text-amber-300",
            ].join(" ")}
          >
            {content.video.status}
          </span>
        </div>
        <div className="mt-4 flex aspect-video items-center justify-center rounded-md border border-dashed border-slate-700 bg-[#070a0f]">
          <span className="font-mono text-xs uppercase tracking-normal text-slate-600">
            video preview placeholder
          </span>
        </div>
      </div>
    </section>
  );
}

function QuizPanel({ quiz }: { quiz: TopicQuizQuestion[] }) {
  return (
    <section
      className="rounded-lg border border-slate-800 bg-slate-950/60 p-4"
      id="quiz"
    >
      <SectionHeading eyebrow="Quiz" title="Review questions" />
      <div className="mt-4 grid gap-3">
        {quiz.map((question, index) => (
          <div
            className="rounded-lg border border-slate-800 bg-slate-900/50 p-4"
            key={question.question}
          >
            <p className="font-mono text-xs text-slate-500">
              Question {index + 1}
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-200">
              {question.question}
            </p>
            <div className="mt-3 grid gap-2">
              {question.options.map((option) => (
                <div
                  className={[
                    "rounded border px-3 py-2 text-sm",
                    option === question.answer
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : "border-slate-800 bg-slate-950 text-slate-400",
                  ].join(" ")}
                  key={option}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PracticePanel({
  problems,
}: {
  problems: TopicPracticeProblem[];
}) {
  return (
    <section
      className="rounded-lg border border-slate-800 bg-slate-950/60 p-4"
      id="practice-problems"
    >
      <SectionHeading eyebrow="External problems" title="Practice links" />
      <div className="mt-4 grid gap-3">
        {problems.map((problem) => (
          <a
            className="group rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-700"
            href={problem.href}
            key={`${problem.platform}-${problem.title}`}
            rel="noreferrer"
            target="_blank"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-200">
                  {problem.title}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-500">
                  {problem.platform}
                </p>
              </div>
              <span
                className={`rounded border px-2 py-1 font-mono text-[11px] ${difficultyClasses[problem.difficulty]}`}
              >
                {problem.difficulty}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function TopicNavigation({
  nextTopic,
  previousTopic,
}: {
  nextTopic?: DashboardTopic;
  previousTopic?: DashboardTopic;
}) {
  return (
    <nav className="grid gap-3 sm:grid-cols-2" aria-label="Topic navigation">
      <TopicNavLink label="Previous topic" topic={previousTopic} />
      <TopicNavLink label="Next topic" topic={nextTopic} alignRight />
    </nav>
  );
}

function TopicNavLink({
  alignRight = false,
  label,
  topic,
}: {
  alignRight?: boolean;
  label: string;
  topic?: DashboardTopic;
}) {
  if (!topic) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-600">
        {label}: none
      </div>
    );
  }

  return (
    <Link
      className={[
        "rounded-lg border border-slate-800 bg-slate-950/60 p-4 transition-colors hover:border-slate-700 hover:bg-slate-900/60",
        alignRight ? "text-left sm:text-right" : "",
      ].join(" ")}
      href={`/tracks/${topic.trackSlug}/topics/${topic.slug}`}
    >
      <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-200">{topic.title}</p>
    </Link>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-lg font-semibold tracking-normal text-slate-100">
        {title}
      </h2>
    </div>
  );
}

const pageSections = [
  { href: "#topic-explanation", label: "Topic explanation" },
  { href: "#video-readiness", label: "Video readiness" },
  { href: "#quiz", label: "Quiz" },
  { href: "#practice-problems", label: "Practice problems" },
];

function PageTableOfContents() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20 border-l border-slate-800 pl-4">
        <p className="font-mono text-xs uppercase tracking-normal text-slate-500">
          On this page
        </p>
        <nav aria-label="Topic page sections" className="mt-4 grid gap-3">
          {pageSections.map((section) => (
            <a
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-200"
              href={section.href}
              key={section.href}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export function TopicDetailPage({
  content,
  nextTopic,
  previousTopic,
  topic,
  topics,
  track,
}: {
  content: TopicPreviewContent;
  nextTopic?: DashboardTopic;
  previousTopic?: DashboardTopic;
  topic: DashboardTopic;
  topics: DashboardTopic[];
  track: DashboardTrack;
}) {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#090d12]">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8 xl:grid-cols-[240px_minmax(0,760px)_220px]">
        <TrackTopicRail
          currentTopic={topic}
          topics={topics}
          track={track}
        />

        <div className="flex min-w-0 flex-col gap-6">
          <TopicHeader topic={topic} track={track} />
          <ExplanationPanel content={content} topic={topic} />
          <VideoPanel content={content} />
          <QuizPanel quiz={content.quiz} />
          <PracticePanel problems={content.practiceProblems} />
          <TopicNavigation nextTopic={nextTopic} previousTopic={previousTopic} />
        </div>

        <PageTableOfContents />
      </div>
    </div>
  );
}
