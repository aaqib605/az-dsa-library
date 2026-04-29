# DSA Library Preview - Coding Standards

> Engineering standards for the lightweight DSA Library Markdown/MDX preview platform

---

## 📋 Table of Contents

- [General Principles](#-general-principles)
- [TypeScript](#-typescript)
- [React](#-react)
- [Next.js](#-nextjs)
- [Tailwind CSS v4](#-tailwind-css-v4)
- [Markdown / MDX Rendering](#-markdown--mdx-rendering)
- [Supabase](#-supabase)
- [GitHub Content Fetching](#-github-content-fetching)
- [File Organization](#-file-organization)
- [Naming Conventions](#-naming-conventions)
- [Styling Guidelines](#-styling-guidelines)
- [Data Fetching](#-data-fetching)
- [Validation](#-validation)
- [Error Handling](#-error-handling)
- [Testing](#-testing)
- [Code Quality](#-code-quality)
- [MVP Development Rules](#-mvp-development-rules)

---

## 🧭 General Principles

This project is a lightweight MVP for previewing DSA Library content.

The goal is to build quickly while keeping the codebase clean enough to extend later.

### Priorities

1. **Working preview experience first**
2. **Readable, maintainable code**
3. **Simple architecture over premature abstraction**
4. **Mock-first development, integration-ready structure**
5. **Easy handoff to future developers/content teams**

### Avoid Overengineering

Do not build advanced systems unless explicitly required.

Avoid for MVP:

- Complex CMS workflows
- Role-based permissions
- Student progress tracking
- Paid/free locking logic
- Complex analytics
- Heavy state management
- Deep database normalization beyond what is needed

---

## TypeScript

- Strict mode must be enabled.
- Do not use `any`.
- Use proper typing or `unknown` when the value shape is uncertain.
- Define interfaces/types for:
  - Component props
  - Track models
  - Topic models
  - Markdown metadata/frontmatter
  - GitHub API responses
  - Supabase responses
  - Custom Markdown block data
- Use type inference where obvious.
- Use explicit types where it improves readability.
- Avoid overly clever generic types for MVP code.

### Preferred

```ts
interface Topic {
  id: string;
  title: string;
  slug: string;
  trackSlug: string;
  status: TopicStatus;
  level: TopicLevel;
  githubPath: string;
  videoUrl?: string;
  orderIndex: number;
}

type TopicStatus = 'draft' | 'in-review' | 'published';
type TopicLevel = 'beginner' | 'intermediate' | 'advanced';
```

### Avoid

```ts
const topic: any = data;
```

Use:

```ts
const topic = data as Topic;
```

Or better, validate using Zod before trusting external data.

---

## React

- Use functional components only.
- Do not use class components.
- Use hooks for local state, side effects, and reusable UI logic.
- Keep components focused: one component should do one clear job.
- Extract reusable logic into custom hooks only when reused or when the component becomes hard to read.
- Prefer composition over large configurable components.
- Avoid unnecessary global state.
- Keep rendering components separate from data-fetching logic where possible.

### Component Rules

Good component boundaries:

- `TrackCard`
- `TopicCard`
- `SidebarNav`
- `MarkdownRenderer`
- `VideoBlock`
- `QuizBlock`
- `ProblemCard`
- `TableOfContents`
- `FileUploadPreview`

Avoid huge components like:

- `DashboardEverything.tsx`
- `TopicPageFullLogic.tsx`
- `MarkdownPreviewWithAllParsingAndUI.tsx`

---

## Next.js

Use Next.js App Router.

### Server Components

- Server components are the default.
- Fetch track/topic metadata in server components whenever possible.
- Use server components for read-heavy pages:
  - `/`
  - `/tracks/[trackSlug]`
  - `/tracks/[trackSlug]/[topicSlug]`

### Client Components

Only use `'use client'` when required for:

- State
- Interactivity
- File uploads
- Textarea live preview
- Browser APIs
- Toast notifications
- Tabs, drawers, or modals

Examples that should be client components:

- `FileUploadPreview`
- `ManualMarkdownEditor`
- `QuizBlock` if interactive
- `AdminSyncButton`

### Server Actions

Use Server Actions for simple mutations:

- Triggering a mock sync
- Saving topic metadata
- Updating topic status
- Creating/editing local catalogue records

### API Routes

Use API routes only when needed for:

- GitHub webhooks
- GitHub content sync endpoints
- File upload handling
- Third-party callbacks
- Long-running operations
- Specific HTTP headers/status codes
- Future public/mobile/CLI clients

For MVP, GitHub fetching can be implemented through server utilities and server actions before adding API routes.

### Routing

Use clear dynamic routes:

```txt
/
/preview
/admin/sync
/tracks/[trackSlug]
/tracks/[trackSlug]/[topicSlug]
```

---

## Tailwind CSS v4

**CRITICAL:** This project uses Tailwind CSS v4, which uses CSS-based configuration.

- Do **not** create `tailwind.config.ts`.
- Do **not** create `tailwind.config.js`.
- Do **not** use JavaScript-based Tailwind configuration.
- All theme configuration must be done in CSS using `@theme` inside `src/app/globals.css`.
- Use CSS custom properties for colors, spacing, radius, shadows, and typography tokens.

### Example Tailwind v4 Setup

```css
@import "tailwindcss";

@theme {
  --color-background: #0f172a;
  --color-surface: #111827;
  --color-surface-muted: #1f2937;
  --color-border: #334155;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #cbd5e1;
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  --radius-card: 1rem;
  --shadow-card: 0 8px 30px rgba(15, 23, 42, 0.16);
}
```

### Tailwind Rules

- Use Tailwind utilities for styling.
- Avoid custom CSS unless needed for Markdown typography or syntax highlighting.
- Keep repeated class combinations inside reusable components.
- Do not use inline styles.
- Prefer semantic CSS variables for theme-level values.

---

## Markdown / MDX Rendering

Markdown/MDX rendering is the core of this project.

### Renderer Rules

- Keep Markdown rendering isolated inside `MarkdownRenderer`.
- Do not scatter Markdown parsing logic across pages.
- Support standard Markdown features:
  - Headings
  - Paragraphs
  - Lists
  - Tables
  - Blockquotes
  - Links
  - Images
  - Code blocks
- Support custom educational blocks:
  - Video blocks
  - Quiz blocks
  - Problem cards
  - Callouts

### Recommended Libraries

Use:

```txt
react-markdown
remark-gfm
gray-matter
rehype-slug
rehype-autolink-headings
rehype-highlight or rehype-pretty-code
```

If MDX is required:

```txt
next-mdx-remote
@mdx-js/react
```

### Custom Block Syntax

Use simple Markdown-compatible blocks for MVP:

```md
:::video
https://www.youtube.com/watch?v=example
:::
```

```md
:::quiz
question: What is the time complexity of array access?
options: O(1), O(log n), O(n), O(n log n)
answer: O(1)
:::
```

```md
:::problem
title: Two Sum
platform: LEETCODE
difficulty: Easy
url: https://leetcode.com/problems/two-sum/
:::
```

### Parsing Rules

- Parse custom blocks before passing Markdown to renderer, or use a remark plugin if needed later.
- Keep custom parser logic small and well-tested.
- If parsing fails, show a readable fallback instead of crashing the page.
- Never execute arbitrary user-provided JavaScript from Markdown/MDX.

---

## Supabase

Supabase is used as the metadata/catalogue layer, not necessarily as the source of Markdown content.

### Supabase Usage

Use Supabase for:

- Tracks
- Topics
- Topic status
- GitHub file path
- Video URL
- Order index
- Content ownership
- Last synced timestamp

Do not use Supabase as the primary Markdown content store unless explicitly required.

### Source of Truth

For MVP:

```txt
GitHub = Markdown/MDX content source
Supabase = Metadata and navigation index
Next.js = Preview/rendering layer
```

### Supabase Client Rules

- Keep Supabase client setup in `src/lib/supabase/`.
- Use separate clients for server and browser if needed.
- Do not expose service-role keys to the browser.
- Only use public anon keys in client-side code.
- Validate all data returned from Supabase before rendering critical UI.

### Suggested Files

```txt
src/lib/supabase/client.ts
src/lib/supabase/server.ts
src/lib/supabase/queries.ts
src/types/database.ts
```

---

## GitHub Content Fetching

GitHub is the preferred content source for Markdown/MDX files.

### GitHub Rules

- Keep GitHub access logic in `src/lib/github.ts` or `src/lib/github/`.
- Keep GitHub tokens server-side only.
- Do not expose GitHub tokens in client components.
- Use environment variables for GitHub owner, repo, branch, and token.
- Support fallback mock content when GitHub is not configured.

### Environment Variables

```env
GITHUB_TOKEN=
GITHUB_OWNER=
GITHUB_REPO=
GITHUB_BRANCH=main
```

### Recommended Functions

```ts
async function fetchMarkdownFromGitHub(path: string): Promise<string>;
async function fetchGitHubContentTree(): Promise<GitHubContentNode[]>;
async function syncGitHubTopics(): Promise<SyncResult>;
```

### Error Handling

GitHub fetch errors should not break the full app.

Show useful states:

- Content not found
- GitHub token missing
- Rate limit exceeded
- Invalid file path
- Markdown parse failed

---

## File Organization

Use feature-based organization.

```txt
dsa-library-preview/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── preview/
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   └── sync/
│   │   │       └── page.tsx
│   │   └── tracks/
│   │       └── [trackSlug]/
│   │           ├── page.tsx
│   │           └── [topicSlug]/
│   │               └── page.tsx
│   ├── actions/
│   │   ├── github-sync.ts
│   │   └── topics.ts
│   ├── components/
│   │   ├── layout/
│   │   ├── tracks/
│   │   ├── topics/
│   │   ├── markdown/
│   │   ├── preview/
│   │   └── ui/
│   ├── lib/
│   │   ├── github.ts
│   │   ├── mock-data.ts
│   │   ├── markdown.ts
│   │   ├── supabase/
│   │   └── utils.ts
│   ├── types/
│   │   ├── content.ts
│   │   ├── github.ts
│   │   ├── markdown.ts
│   │   └── supabase.ts
│   └── app/globals.css
```

### Placement Rules

- Components: `src/components/[feature]/ComponentName.tsx`
- Pages: `src/app/[route]/page.tsx`
- Server Actions: `src/actions/[feature].ts`
- Types: `src/types/[feature].ts`
- Lib/Utils: `src/lib/[utility].ts`
- Mock data: `src/lib/mock-data.ts`
- Markdown utilities: `src/lib/markdown.ts`

---

## Naming Conventions

### Files

- Components: PascalCase
  - `TopicCard.tsx`
  - `MarkdownRenderer.tsx`
- Utility files: kebab-case or simple camel-case
  - `mock-data.ts`
  - `github.ts`
  - `markdown.ts`
- Types: kebab-case by feature
  - `content.ts`
  - `github.ts`

### Code

- Components: PascalCase
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/interfaces: PascalCase
- Hooks: `useSomething`
- Server Actions: action-style names
  - `syncGitHubContent`
  - `updateTopicStatus`

### Examples

```ts
const DEFAULT_TRACK_SLUG = 'beginner-dsa';

function getTopicBySlug(trackSlug: string, topicSlug: string) {}

interface MarkdownRendererProps {
  content: string;
}
```

---

## Styling Guidelines

- Use Tailwind CSS for all styling.
- Use shadcn/ui components where applicable.
- Do not use inline styles.
- Dark mode first, light mode optional.
- Maintain high readability for long-form educational content.
- Use consistent spacing for content pages.
- Keep content width readable.
- Make sidebars sticky only on desktop.
- Ensure the preview page works well on laptop screens.

### Markdown Content Styling

The rendered content should have strong typography defaults:

- Clear heading hierarchy
- Comfortable paragraph line height
- Good code block spacing
- Tables should be readable and horizontally scrollable if needed
- Links should be visually distinct
- Images should be responsive
- Blockquotes/callouts should stand out without being noisy

### Avoid

- Tiny text
- Dense layouts
- Excessive borders
- Too many colors
- Hardcoded colors scattered across components
- Inline styles

---

## Data Fetching

### MVP Strategy

Use mock data first.

```txt
src/lib/mock-data.ts
```

Then progressively replace mock functions with Supabase/GitHub integrations.

### Preferred Pattern

Create data-access functions:

```ts
async function getTracks(): Promise<Track[]>;
async function getTopicsByTrack(trackSlug: string): Promise<Topic[]>;
async function getTopicBySlug(trackSlug: string, topicSlug: string): Promise<Topic | null>;
async function getTopicMarkdown(topic: Topic): Promise<string>;
```

Pages should call these functions instead of directly importing data everywhere.

### Do Not

- Fetch GitHub content directly inside random UI components.
- Query Supabase from deeply nested presentational components.
- Mix mock data and live data inconsistently across the same page.

---

## Validation

Use Zod for all external or uncertain data.

Validate:

- Supabase responses when needed
- GitHub API responses
- Markdown frontmatter
- Custom block data
- Manual upload content metadata
- Server Action inputs

### Example

```ts
import { z } from 'zod';

export const TopicFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  track: z.string().min(1),
  order: z.number().optional(),
  status: z.enum(['draft', 'in-review', 'published']).default('draft'),
  videoUrl: z.string().url().optional(),
});
```

---

## Error Handling

- Use `try/catch` in Server Actions.
- Return a consistent result pattern from actions.
- Display user-friendly messages in the UI.
- Log detailed errors on the server only.
- Never expose secrets, tokens, or raw stack traces to the user.

### Server Action Result Pattern

```ts
interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Example

```ts
return {
  success: false,
  error: 'Unable to sync GitHub content. Please check the repository settings.',
};
```

### UI Error States

Use clear states for:

- Topic not found
- Track not found
- Markdown file missing
- GitHub sync failed
- Invalid uploaded file
- Unsupported custom block

---

## Testing

Testing should be useful, not excessive.

### Use Vitest For

- Markdown parser utilities
- Custom block parser
- GitHub path utilities
- Topic sorting/filtering utilities
- Server Actions where practical
- Validation schemas

### Do Not Prioritize Initially

- Full component testing
- E2E tests
- Snapshot-heavy tests

### Test File Location

Place tests next to the source file:

```txt
markdown.ts
markdown.test.ts
```

### Commands

```bash
npm run test
npm run test:watch
```

### Mocking

Use:

```ts
vi.mock()
```

For external dependencies like:

- Supabase client
- GitHub API calls
- File upload APIs

---

## Code Quality

- No commented-out code unless it explains an intentional future integration.
- No unused imports.
- No unused variables.
- Keep functions under 50 lines when practical.
- Keep components under 200 lines when practical.
- Prefer small helper functions over deeply nested logic.
- Avoid unnecessary dependencies.
- Avoid clever abstractions that slow down MVP delivery.
- Write clear names instead of excessive comments.
- Use comments only when the reasoning is not obvious.

### Before Commit Checklist

Run:

```bash
npm run lint
npm run typecheck
npm run test
```

Check:

- No TypeScript errors
- No console logs left in production paths
- No hardcoded secrets
- No broken routes
- Markdown preview still works
- Upload preview still works
- Topic navigation still works

---

## MVP Development Rules

This project should stay lightweight.

### Build First

The first version must support:

- Track listing
- Topic listing
- Topic preview
- Manual Markdown paste/upload preview
- Mock data fallback
- GitHub-ready content fetching structure
- Supabase-ready metadata structure

### Integrate Later

Do not block MVP on:

- Perfect Supabase schema
- Full GitHub sync automation
- Authentication
- Role permissions
- Student-facing LMS features
- Production-grade CMS workflows

### Required User Experience

The MVP must answer this question clearly:

> “If we create a DSA topic in Markdown/MDX, how will it look to the learner?”

Everything else is secondary.

---

_Last updated: April 2026_
