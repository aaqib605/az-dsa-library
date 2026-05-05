# Topic View Rendering Spec

## Overview

This spec defines how an individual DSA topic page should render when a user clicks a topic from any track page such as:

- `/tracks/beginner-dsa`
- `/tracks/intermediate-dsa`
- `/tracks/advanced-dsa`

The topic view is the core reading and learning experience of the DSA Library app. It should present structured explanation content, video references, quizzes, related practice problems, and topic metadata in a clean internal-preview interface.

The UI should follow the dark, developer-tool inspired design shown in the project screenshots.

## Goal

Create a polished topic detail page that helps the internal team preview how a DSA topic will look before publishing.

The page should make it easy to:

- Read the topic explanation
- Understand topic status and level
- Preview video/content readiness
- See linked practice problems
- Review quizzes attached to the topic
- Navigate back to the parent track
- Move between nearby topics in the same track

This is a UI-first implementation using mock data only for now.

## Scope

Build the topic rendering page UI for individual topic routes.

The implementation should support routes such as:

- `/tracks/beginner-dsa/topics/data-types`
- `/tracks/beginner-dsa/topics/loops`
- `/tracks/beginner-dsa/topics/arrays`
- `/tracks/intermediate-dsa/topics/binary-search`
- `/tracks/intermediate-dsa/topics/two-pointers`
- `/tracks/advanced-dsa/topics/segment-tree`
- `/tracks/advanced-dsa/topics/dynamic-programming-optimization`

The route naming can be adjusted based on the existing app router structure, but the spec should be implemented as dynamic topic pages.

Do not build backend/API integration in this phase.

## References

Use these screenshots as the primary UI inspiration:

- `@context/screenshots/ui-dsa-track-topic-view.png`
- `@context/screenshots/ui-dsa-track-view.png`
- `@context/screenshots/dashboard-ui-main.png`
- `@context/screenshots/ui-markdown-preview.png`

## Notes for AI implementation

- Keep this implementation UI-first.
- Use mock data from `@src/lib/mock-data.ts` or create a nearby mock data file if needed.
- Preserve the app shell and navbar already defined in earlier specs.
- Keep styling consistent with the dashboard and track detail pages.
- Prefer reusable cards and small components.
- Do not over-engineer state management.
- Make the page look complete even with mock content.
