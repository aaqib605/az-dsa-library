# Track Detail Pages Spec

## Overview

This spec defines the track detail pages for the DSA Library internal preview app.

The following routes should share the same layout and component structure:

- `/tracks/beginner-dsa`
- `/tracks/intermediate-dsa`
- `/tracks/advanced-dsa`

Each route represents one DSA learning track and displays a clean list of topics inside that track. The UI should be inspired by the existing dark, developer-tool style screenshots, especially the track detail view.

The goal is to build a polished, mock-data driven track page that lets an internal reviewer quickly scan the topics in a track, understand their status, and open a topic preview page.

## Goal

Create reusable track detail pages for Beginner, Intermediate, and Advanced DSA.

Each page should:

- Show the selected track title and level
- Show a short track description
- Display all topics in that track as structured list cards
- Show metadata for every topic such as duration, content file path, and publish status
- Provide a clear way to go back to all tracks
- Preserve the same dark-mode app shell used across the dashboard
- Use mock data only for now

## Scope

Build the UI for the three track detail routes only.

Included in scope:

- Shared track detail page layout
- Dynamic/static route handling for the three tracks
- Track header section
- Topic list cards
- Topic status badges
- Topic metadata row
- Empty state fallback
- Basic click behavior for topic cards
- Responsive behavior

Not included in scope:

- Real markdown rendering
- Real GitHub sync
- CMS integration
- Authentication
- Topic editing
- Video player integration
- Real progress tracking
- Admin CRUD actions

## Routes

Create or support the following routes:

```txt
/tracks/beginner-dsa
/tracks/intermediate-dsa
/tracks/advanced-dsa
```

## Visual direction

Use the project screenshots as the primary visual reference.

The page should feel like an internal developer preview tool, not a marketing landing page.

Visual style:

- Dark background
- Subtle borders
- Muted secondary text
- Compact spacing
- Monospace metadata
- Rounded cards
- Clear hierarchy
- Minimal color usage
- Technical/productivity-tool feel

The track detail page should visually match the screenshot where the Beginner DSA page shows:

- Back link: `All tracks`
- Small level badge: `BEGINNER`
- Large heading: `Beginner DSA`
- Short description below the heading
- Vertical list of topic cards
- Each topic card has index, title, duration, markdown path, and status badge

## References

- `@context/screenshots/ui-dsa-track-view.png`
- `@context/screenshots/ui-dsa-track-topic-view.png`
- `@context/screenshots/dashboard-ui-main.png`
- `@context/screenshots/ui-markdown-preview.png`

Behavior:

- Link should navigate to `/tracks` or `/dashboard` depending on the current app routing decision
- Prefer `/tracks` if a tracks listing route exists
- Text should be muted by default
- On hover, text should become brighter
- Keep it simple and lightweight

Visual requirements:

- Small font size
- Inline arrow icon or Lucide `ArrowLeft`
- Muted grey color
- No button background

## ShadCN / UI usage

Use ShadCN components where helpful, but do not force them unnecessarily.

Suitable components:

- `Badge`
- `Card`
- `Button` only for fallback/back actions if needed

Basic HTML with Tailwind is acceptable for the topic rows.

Use Lucide icons only if already installed or part of the current setup.

Suggested icons:

- `ArrowLeft`
- `Clock`
- `FileText`

## Implementation notes

- Keep the UI intentionally minimal and production-like.
- Avoid adding analytics, permissions, or backend logic in this phase.
- Do not introduce large layout changes to the global dashboard shell.
- Do not duplicate code across the three track pages if a dynamic route is easy to support.
- Preserve the navbar and app shell behavior from the existing dashboard specs.
- Use the screenshots as visual inspiration, not as a strict pixel-perfect requirement.
