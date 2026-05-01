export type TrackStatus = "Draft" | "In Review" | "Ready" | "Published";

export interface DashboardTrack {
  id: string;
  name: string;
  slug: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  topicCount: number;
  readyCount: number;
  status: TrackStatus;
  accentClassName: string;
}

export interface DashboardTopic {
  id: string;
  trackSlug: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  markdownPath: string;
  status: TrackStatus;
  orderIndex: number;
}

export const dashboardTracks: DashboardTrack[] = [
  {
    id: "beginner-dsa",
    name: "Beginner DSA",
    slug: "beginner-dsa",
    level: "Beginner",
    description:
      "Foundations for arrays, strings, hash maps, recursion, and core programming fluency.",
    topicCount: 3,
    readyCount: 2,
    status: "Ready",
    accentClassName: "from-emerald-500/20 to-transparent",
  },
  {
    id: "intermediate-dsa",
    name: "Intermediate DSA",
    slug: "intermediate-dsa",
    level: "Intermediate",
    description:
      "Problem-solving patterns across trees, graphs, two pointers, sorting, and binary search.",
    topicCount: 2,
    readyCount: 1,
    status: "In Review",
    accentClassName: "from-sky-500/20 to-transparent",
  },
  {
    id: "advanced-dsa",
    name: "Advanced DSA",
    slug: "advanced-dsa",
    level: "Advanced",
    description:
      "Interview-ready advanced algorithms including dynamic programming, segment trees, and graphs.",
    topicCount: 1,
    readyCount: 0,
    status: "Draft",
    accentClassName: "from-fuchsia-500/20 to-transparent",
  },
];

export const dashboardTopics: DashboardTopic[] = [
  {
    id: "cpp-basics",
    trackSlug: "beginner-dsa",
    slug: "cpp-basics",
    title: "C++ Basics",
    description:
      "Set up syntax fundamentals, input/output, variables, and basic control flow.",
    duration: "28 min",
    markdownPath: "content/beginner-dsa/cpp-basics/index.mdx",
    status: "Published",
    orderIndex: 1,
  },
  {
    id: "arrays-introduction",
    trackSlug: "beginner-dsa",
    slug: "arrays-introduction",
    title: "Arrays Introduction",
    description:
      "Understand contiguous storage, indexing, traversal, updates, and common mistakes.",
    duration: "35 min",
    markdownPath: "content/beginner-dsa/arrays-introduction/index.mdx",
    status: "Ready",
    orderIndex: 2,
  },
  {
    id: "strings",
    trackSlug: "beginner-dsa",
    slug: "strings",
    title: "Strings",
    description:
      "Practice character access, mutation patterns, frequency counts, and parsing.",
    duration: "31 min",
    markdownPath: "content/beginner-dsa/strings/index.mdx",
    status: "In Review",
    orderIndex: 3,
  },
  {
    id: "recursion",
    trackSlug: "intermediate-dsa",
    slug: "recursion",
    title: "Recursion",
    description:
      "Build recursive thinking with base cases, call stacks, and backtracking previews.",
    duration: "42 min",
    markdownPath: "content/intermediate-dsa/recursion/index.mdx",
    status: "Ready",
    orderIndex: 1,
  },
  {
    id: "binary-search",
    trackSlug: "intermediate-dsa",
    slug: "binary-search",
    title: "Binary Search",
    description:
      "Learn monotonic predicates, boundaries, and implementation templates.",
    duration: "39 min",
    markdownPath: "content/intermediate-dsa/binary-search/index.mdx",
    status: "In Review",
    orderIndex: 2,
  },
  {
    id: "dynamic-programming",
    trackSlug: "advanced-dsa",
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    description:
      "Introduce state design, transitions, memoization, and tabulation patterns.",
    duration: "55 min",
    markdownPath: "content/advanced-dsa/dynamic-programming/index.mdx",
    status: "Draft",
    orderIndex: 1,
  },
];

export function getDashboardTrack(trackSlug: string) {
  return dashboardTracks.find((track) => track.slug === trackSlug);
}

export function getTopicsForTrack(trackSlug: string) {
  return dashboardTopics
    .filter((topic) => topic.trackSlug === trackSlug)
    .sort((firstTopic, secondTopic) => firstTopic.orderIndex - secondTopic.orderIndex);
}
