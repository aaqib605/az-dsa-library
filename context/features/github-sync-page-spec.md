# GitHub Sync Page Spec

## Overview

This spec defines the GitHub sync page for the DSA Library internal preview app.

The page allows internal users to view and trigger mock GitHub content sync actions for DSA markdown files. For now, this is UI-only and should use mock data.

## Goal

Create a clean, dark-mode GitHub sync page where users can quickly understand:

- Which repository is connected
- Last sync status
- Last synced commit or branch
- Markdown/content files detected
- Whether sync succeeded, failed, or is pending

The page should feel like an internal developer/admin tool, not a public-facing settings page.

## Scope

Build only the GitHub sync UI.

Do not implement real GitHub OAuth, API calls, webhook handling, or background jobs.

## References

- `@context/screenshots/ui-github-sync-view.png`
- `@context/screenshots/dashboard-ui-main.png`
- `@context/project-overview.md`

## Non-goals

Do not build:

- Real GitHub authentication
- Real repository connection
- Real sync jobs
- Webhooks
- Backend APIs
- File parsing logic
- Markdown validation logic

## Acceptance criteria

- `/sync` route exists
- Page uses the existing dashboard layout and navbar
- Page is dark-mode compatible
- Repository info is clearly visible
- Sync status is easy to understand
- Synced markdown files are listed cleanly
- Recent activity is shown
- UI uses mock data only
- Page is responsive and visually consistent with the project screenshots
