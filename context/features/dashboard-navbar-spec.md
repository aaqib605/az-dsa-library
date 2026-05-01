# Dashboard Navbar Spec

## Overview

This spec defines the navbar/top navigation for the DSA Library internal preview app. The navbar should act as the persistent global header across the dashboard, track listing, topic preview, markdown preview, and sync/admin views.

The design should follow the existing dark, developer-tool inspired UI shown in the project screenshots.

## Goal

Create a clean, sticky, dark-mode navbar(just the UI for now) that helps users quickly understand where they are and move between the main internal preview areas:

- Tracks
- Preview
- Sync

The navbar should feel lightweight, technical, and production-ready, not like a marketing website navbar.

## Scope

Build only the app navbar/header component and wire it into the dashboard layout.

Do not build full page content in this spec.

## Visual direction

Use the project screenshots as the primary visual reference.

The navbar should have:

- Full-width top bar
- Dark background matching the app shell
- Subtle bottom border
- Left-aligned brand block
- Right-aligned navigation items
- Compact height
- Monospace/product-tool feel
- Active route state
- Responsive behavior for smaller screens

## References

- `@context/screenshots/dashboard-ui-main.png`
- `@context/screenshots/ui-dsa-track-view.png`
- `@context/screenshots/ui-dsa-track-topic-view.png`
- `@context/screenshots/ui-markdown-preview.png`
- `@context/screenshots/ui-github-sync-view.png`

### 3. Mobile menu

On smaller screens:

- Hide desktop nav items
- Show a compact menu button on the right
- Clicking opens a ShadCN Sheet, DropdownMenu, or simple mobile menu
- Mobile menu should include the same nav items: Tracks, Preview, Sync
- Active item should still be visible in the mobile menu

Do not overbuild mobile interactions. Keep it simple and reliable.
