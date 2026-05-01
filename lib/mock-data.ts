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
