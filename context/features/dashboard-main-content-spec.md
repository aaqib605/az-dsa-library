# Dashboard Main Content Spec

## Overview

This spec defines the main dashboard content area for the DSA Library internal preview app.

The dashboard main content should act as the landing view after the user enters `/dashboard`. It should give a clear snapshot of the DSA Library system, available learning tracks, content readiness, recent updates, and quick entry points into preview/admin workflows.

The design should follow the existing dark, developer-tool inspired UI shown in the project screenshots and should work naturally with the dashboard navbar/top navigation spec.

## Goal

Create a polished, dark-mode dashboard main content UI that helps internal users quickly understand:

- What DSA tracks exist
- How much content is ready
- Which sections need work
- What changed recently
- Where to continue reviewing or editing

The dashboard should feel like an internal content operating system for the DSA Library, not a student-facing learning page.

## Scope

Build only the main dashboard content area for now.

This spec does not include:

- Full track detail page implementation
- Full topic preview page implementation
- Markdown editor implementation
- GitHub sync logic
- Real backend integration
- Authentication or role permissions

Use mock data from the project wherever needed.

## Route

Primary route:

- `/dashboard`

The dashboard main content should render inside the existing dashboard app shell, below the persistent navbar/top navigation.

## Visual direction

Use the project screenshots as the primary visual reference.

The main dashboard content should have:

- Dark background matching the app shell
- Spacious but compact internal-tool layout
- Card-based sections
- Subtle borders and muted surfaces
- Clean typography
- Small status indicators
- Developer/productivity-tool feel
- Clear information hierarchy
- Responsive behavior for tablet and mobile screens

Avoid a marketing-style homepage. This should feel like a working dashboard for managing structured DSA content.

## References

- `@context/screenshots/dashboard-ui-main.png`
- `@context/screenshots/ui-dsa-track-view.png`
- `@context/screenshots/ui-dsa-track-topic-view.png`
- `@context/screenshots/ui-markdown-preview.png`
- `@context/screenshots/ui-github-sync-view.png`

## Requirements

### 1. Main content container

Create a main content wrapper below the navbar.

The container should:

- Use full available width
- Have consistent page padding
- Use dark-mode surfaces
- Be responsive across desktop, tablet, and mobile
- Keep content centered/max-width only if it improves readability
- Avoid unnecessary empty space on large screens

Suggested layout behavior:

- Desktop: multi-column dashboard layout
- Tablet: two-column where possible
- Mobile: single-column stacked layout

### 2. Dashboard header section

At the top of the main content area, add a dashboard header.

It should include:

- Page title: `DSA Library Dashboard`
- Short subtitle explaining the dashboard purpose
- Optional small status pill such as `Internal Preview`
- Optional last updated text using mock data/static text

Example subtitle:

`Manage tracks, preview topic content, and monitor content readiness for the DSA Library.`

The header should feel compact and functional.

### 3. Primary summary cards

Add a row/grid of summary cards showing high-level content status.

Suggested cards:

- Total Tracks
- Total Topics
- Ready for Preview
- Needs Review

Each card should include:

- Label
- Main numeric value
- Small helper text
- Optional icon from `lucide-react`
- Optional status trend or badge

Use mock values from the existing mock data file where possible. If exact values are not available, derive them from mock arrays or use clearly static placeholder values.

The cards should use subtle borders, muted backgrounds, and compact spacing.

### 4. Tracks overview section

Create a main section for available DSA tracks.

This section should show a list/grid of track cards.

Each track card should include:

- Track name
- Short description
- Difficulty or level label if available
- Number of topics
- Progress/readiness indicator
- Status badge such as `Draft`, `In Review`, `Ready`, or `Published`
- CTA/action button such as `Open Track` or `Preview`

The section should make it easy to understand which track to open next.

Preferred behavior:

- Use mock track data
- Clicking a card/action can link to the relevant preview route if available
- If route is not implemented yet, keep the button display-only or link to a placeholder route

Do not implement complex filtering in this phase unless already available in the mock data.

### 5. Content readiness section

Add a section that summarizes content readiness across the library.

This can be implemented as cards, compact rows, or a simple progress panel.

It should communicate:

- Topics with markdown ready
- Topics with video pending
- Topics with problems mapped
- Topics needing review

Possible UI patterns:

- Horizontal progress bars
- Small status rows
- Badge counters
- Compact checklist-style cards

Keep the design clean and useful for internal tracking.

### 6. Recent activity section

Add a recent activity panel showing mock updates.

Examples:

- `Arrays topic preview updated`
- `Binary Search markdown added`
- `GitHub sync completed`
- `Two topics marked as Needs Review`

Each activity item should include:

- Short title
- Small timestamp or relative time
- Optional type badge: `Content`, `Preview`, `Sync`, `Review`

This should be display-only for now.

### 7. Quick actions section

Add a compact quick actions area.

Suggested actions:

- View Tracks
- Open Markdown Preview
- Check GitHub Sync
- Review Pending Topics

Each action should be presented as a button, small card, or command-style row.

The actions should align with the navbar destinations:

- Tracks
- Preview
- Sync

Do not add actions that require real backend functionality.

### 8. Main dashboard composition

A suggested desktop structure:

1. Header section
2. Summary stats grid
3. Two-column layout:
   - Left/main column: Tracks overview
   - Right/side column: Content readiness, recent activity, quick actions

For mobile:

1. Header
2. Summary cards stacked or two-column
3. Tracks overview
4. Content readiness
5. Recent activity
6. Quick actions

The layout should remain readable and not feel cramped.

## Component expectations

Use a clean component structure.

Suggested components:

- `DashboardMainContent`
- `DashboardHeader`
- `DashboardStatsGrid`
- `DashboardStatCard`
- `TracksOverview`
- `TrackCard`
- `ContentReadinessPanel`
- `RecentActivityPanel`
- `QuickActionsPanel`

Keep components simple and reusable.

## Styling expectations

Use the existing app styling approach.

Preferred:

- Tailwind CSS v4 utilities
- ShadCN UI components where useful
- `lucide-react` icons for small visual cues
- Existing theme variables if already configured

## Mock data expectations

Use `@src/lib/mock-data.ts` as the preferred mock data source.

Do not introduce real API calls in this phase.

Empty states should be subtle and fit the dark internal-tool UI.

## Interaction behavior

This phase is mostly UI/display.

Allowed interactions:

- Buttons/links can navigate to existing routes if available
- Cards can have hover states
- Buttons can have hover/focus states

Do not implement:

- Real content editing
- Real sync actions
- Real publish actions
- Real filtering/search logic
- Backend mutations
