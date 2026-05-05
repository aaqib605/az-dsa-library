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

export interface TopicVideoPreview {
  title: string;
  duration: string;
  status: "Ready" | "Pending";
  provider: string;
}

export interface TopicCodeExample {
  title: string;
  language: string;
  code: string;
}

export interface TopicQuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface TopicPracticeProblem {
  title: string;
  platform: string;
  difficulty: "Easy" | "Medium" | "Hard";
  href: string;
}

export interface TopicPreviewContent {
  overview: string[];
  keyPoints: string[];
  codeExample: TopicCodeExample;
  complexity: {
    time: string;
    space: string;
    note: string;
  };
  video: TopicVideoPreview;
  quiz: TopicQuizQuestion[];
  practiceProblems: TopicPracticeProblem[];
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
    .sort(
      (firstTopic, secondTopic) =>
        firstTopic.orderIndex - secondTopic.orderIndex,
    );
}

export function getTopicForTrack(trackSlug: string, topicSlug: string) {
  return dashboardTopics.find(
    (topic) => topic.trackSlug === trackSlug && topic.slug === topicSlug,
  );
}

export function getAdjacentTopics(trackSlug: string, topicSlug: string) {
  const topics = getTopicsForTrack(trackSlug);
  const currentIndex = topics.findIndex((topic) => topic.slug === topicSlug);

  return {
    nextTopic: currentIndex >= 0 ? topics[currentIndex + 1] : undefined,
    previousTopic: currentIndex > 0 ? topics[currentIndex - 1] : undefined,
  };
}

export function getTopicPreviewContent(topic: DashboardTopic): TopicPreviewContent {
  return topicPreviewContentBySlug[topic.slug] ?? createFallbackTopicContent(topic);
}

const topicPreviewContentBySlug: Record<string, TopicPreviewContent> = {
  "cpp-basics": {
    overview: [
      "C++ basics establish the syntax and habits learners use throughout the DSA library.",
      "This topic focuses on reading input, writing output, choosing primitive types, and tracing simple programs before moving into arrays and strings.",
    ],
    keyPoints: [
      "Use clear variable names and choose types based on value range.",
      "Read input in the same order the problem statement provides it.",
      "Trace small examples by hand before writing longer logic.",
    ],
    codeExample: {
      title: "Read two values and print their sum",
      language: "cpp",
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << "\\n";
    return 0;
}`,
    },
    complexity: {
      time: "O(1)",
      space: "O(1)",
      note: "The program performs a constant amount of work.",
    },
    video: {
      title: "C++ basics walkthrough",
      duration: "08:12",
      provider: "Internal recording",
      status: "Ready",
    },
    quiz: [
      {
        question: "Which operator is commonly used to read from standard input?",
        options: ["<<", ">>", "::", "&&"],
        answer: ">>",
      },
    ],
    practiceProblems: [
      {
        title: "A plus B",
        platform: "Codeforces",
        difficulty: "Easy",
        href: "https://codeforces.com/",
      },
      {
        title: "Simple Sum",
        platform: "CodeChef",
        difficulty: "Easy",
        href: "https://www.codechef.com/",
      },
    ],
  },
  "arrays-introduction": {
    overview: [
      "Arrays store values in contiguous positions, which makes index-based access fast and predictable.",
      "Most beginner DSA patterns start with traversal, updating values, maintaining counters, or carrying a running answer while scanning an array.",
    ],
    keyPoints: [
      "Array indices usually run from 0 to n - 1.",
      "One pass is often enough for counting, sums, minimums, and maximums.",
      "Boundary checks prevent off-by-one errors.",
    ],
    codeExample: {
      title: "Find the maximum element",
      language: "cpp",
      code: `int findMax(vector<int>& nums) {
    int answer = nums[0];

    for (int value : nums) {
        answer = max(answer, value);
    }

    return answer;
}`,
    },
    complexity: {
      time: "O(n)",
      space: "O(1)",
      note: "The array is scanned once while only one answer variable is stored.",
    },
    video: {
      title: "Arrays introduction preview",
      duration: "11:45",
      provider: "Internal recording",
      status: "Ready",
    },
    quiz: [
      {
        question: "What is the first valid index in a zero-indexed array?",
        options: ["0", "1", "n", "-1"],
        answer: "0",
      },
      {
        question: "What is the time complexity of scanning every element once?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: "O(n)",
      },
    ],
    practiceProblems: [
      {
        title: "Maximum Element",
        platform: "LeetCode",
        difficulty: "Easy",
        href: "https://leetcode.com/",
      },
      {
        title: "Running Sum",
        platform: "LeetCode",
        difficulty: "Easy",
        href: "https://leetcode.com/",
      },
    ],
  },
  strings: {
    overview: [
      "Strings are sequences of characters, so many array traversal ideas apply directly.",
      "Common string tasks include counting frequencies, reversing ranges, checking patterns, and parsing input into meaningful tokens.",
    ],
    keyPoints: [
      "Characters can be compared and counted just like small integers.",
      "Frequency arrays or maps help summarize string content.",
      "Pay attention to spaces and line-based input.",
    ],
    codeExample: {
      title: "Count lowercase character frequency",
      language: "cpp",
      code: `vector<int> countFrequency(string s) {
    vector<int> freq(26, 0);

    for (char ch : s) {
        freq[ch - 'a']++;
    }

    return freq;
}`,
    },
    complexity: {
      time: "O(n)",
      space: "O(1)",
      note: "The frequency array has a fixed size of 26.",
    },
    video: {
      title: "String patterns preview",
      duration: "Pending",
      provider: "Video team",
      status: "Pending",
    },
    quiz: [
      {
        question: "Which structure is useful for counting character occurrences?",
        options: ["Stack", "Frequency array", "Queue", "Heap"],
        answer: "Frequency array",
      },
    ],
    practiceProblems: [
      {
        title: "Valid Anagram",
        platform: "LeetCode",
        difficulty: "Easy",
        href: "https://leetcode.com/",
      },
    ],
  },
  recursion: {
    overview: [
      "Recursion solves a problem by reducing it into smaller versions of itself.",
      "A correct recursive function needs a clear base case, a smaller recursive call, and a way to combine the result.",
    ],
    keyPoints: [
      "Always define the base case before the recursive call.",
      "Make sure each call moves toward the base case.",
      "Use the call stack trace to debug recursive behavior.",
    ],
    codeExample: {
      title: "Compute factorial recursively",
      language: "cpp",
      code: `long long factorial(int n) {
    if (n <= 1) {
        return 1;
    }

    return n * factorial(n - 1);
}`,
    },
    complexity: {
      time: "O(n)",
      space: "O(n)",
      note: "The recursive call stack contains up to n active calls.",
    },
    video: {
      title: "Recursion call stack walkthrough",
      duration: "13:20",
      provider: "Internal recording",
      status: "Ready",
    },
    quiz: [
      {
        question: "What prevents recursion from running forever?",
        options: ["Loop", "Base case", "Vector", "Modulo"],
        answer: "Base case",
      },
    ],
    practiceProblems: [
      {
        title: "Power of Two",
        platform: "LeetCode",
        difficulty: "Easy",
        href: "https://leetcode.com/",
      },
    ],
  },
  "binary-search": {
    overview: [
      "Binary search repeatedly halves a sorted or monotonic search space.",
      "The key skill is identifying what condition lets you discard one half without losing the answer.",
    ],
    keyPoints: [
      "Use binary search when the predicate is monotonic.",
      "Update boundaries carefully to avoid infinite loops.",
      "Test the smallest and largest cases by hand.",
    ],
    codeExample: {
      title: "Find first position with value at least target",
      language: "cpp",
      code: `int lowerBound(vector<int>& nums, int target) {
    int low = 0;
    int high = nums.size();

    while (low < high) {
        int mid = low + (high - low) / 2;

        if (nums[mid] >= target) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
}`,
    },
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      note: "Each iteration removes half of the remaining search range.",
    },
    video: {
      title: "Binary search boundaries",
      duration: "10:40",
      provider: "Internal recording",
      status: "Ready",
    },
    quiz: [
      {
        question: "What kind of condition does binary search need?",
        options: ["Random", "Monotonic", "Cyclic", "Unordered"],
        answer: "Monotonic",
      },
    ],
    practiceProblems: [
      {
        title: "Binary Search",
        platform: "LeetCode",
        difficulty: "Easy",
        href: "https://leetcode.com/",
      },
      {
        title: "Search Insert Position",
        platform: "LeetCode",
        difficulty: "Easy",
        href: "https://leetcode.com/",
      },
    ],
  },
  "dynamic-programming": {
    overview: [
      "Dynamic programming stores answers to overlapping subproblems so they are not recomputed.",
      "The preview introduces state, transition, base cases, and the difference between memoization and tabulation.",
    ],
    keyPoints: [
      "Define what each state represents before writing code.",
      "Transitions should move from known states to unknown states.",
      "Memoization starts from recursion; tabulation starts from base cases.",
    ],
    codeExample: {
      title: "Fibonacci with tabulation",
      language: "cpp",
      code: `int fib(int n) {
    if (n <= 1) {
        return n;
    }

    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}`,
    },
    complexity: {
      time: "O(n)",
      space: "O(n)",
      note: "Each state is computed once and stored in the dp array.",
    },
    video: {
      title: "DP state design preview",
      duration: "Pending",
      provider: "Video team",
      status: "Pending",
    },
    quiz: [
      {
        question: "What does DP avoid recomputing?",
        options: ["Unique states", "Overlapping subproblems", "Input size", "Syntax"],
        answer: "Overlapping subproblems",
      },
    ],
    practiceProblems: [
      {
        title: "Climbing Stairs",
        platform: "LeetCode",
        difficulty: "Easy",
        href: "https://leetcode.com/",
      },
      {
        title: "House Robber",
        platform: "LeetCode",
        difficulty: "Medium",
        href: "https://leetcode.com/",
      },
    ],
  },
};

function createFallbackTopicContent(topic: DashboardTopic): TopicPreviewContent {
  return {
    overview: [
      `${topic.title} is represented with mock content for internal preview.`,
      "This fallback keeps the topic page complete while final curriculum content is being prepared.",
    ],
    keyPoints: [
      "Review the concept explanation.",
      "Confirm examples and practice mapping.",
      "Check the topic status before publishing.",
    ],
    codeExample: {
      title: "Preview placeholder",
      language: "txt",
      code: "Final code example pending.",
    },
    complexity: {
      time: "Pending",
      space: "Pending",
      note: "Complexity analysis will be finalized during content review.",
    },
    video: {
      title: `${topic.title} video preview`,
      duration: "Pending",
      provider: "Video team",
      status: "Pending",
    },
    quiz: [
      {
        question: `What should reviewers verify for ${topic.title}?`,
        options: ["Concept accuracy", "Formatting", "Problem links", "All of these"],
        answer: "All of these",
      },
    ],
    practiceProblems: [
      {
        title: `${topic.title} practice set`,
        platform: "Internal",
        difficulty: "Medium",
        href: "https://leetcode.com/",
      },
    ],
  };
}
