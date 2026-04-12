# Wireframe by Ashiwin

_This is part of my 2026 GitHub tech refresh._

A Next.js application that fetches and displays spaceflight news articles from the Spaceflight News API v4.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Spaceflight News API v4

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

## Design Decisions & Assumptions

**Next.js**\
I chose Next.js over React as a more elegant solution. (Your mileage may vary.)

**API version**\
Using v4 of the Spaceflight News API (`https://api.spaceflightnewsapi.net/v4/articles/`) as v3 is no longer available as on April 2026, when these codes were written.

**Pagination**\
Implemented via `limit` and `offset` query parameters. The page loads 6 articles initially and appends 6 more on each "Load more" click.

**Client-side fetching**\
Since the wireframe requires interactive "Load more" functionality, the page is a client component (`'use client'`).

**Fonts**\
Syne (display/headings) and Figtree (body text) which are loaded via `next/font/google` for zero layout shift.

**Images**\
Article images from the API are not displayed in the card layout to match the wireframe, which shows text-only cards.

**Colour palette**\
Page styled using specified brand colours:

- Background: `#ffeb01`
- Text: `#343433`
- Button background: `#e00069`
- Button text: `#ffffff`
- Header text: `#11326e`

**Error handling**\
Network or API errors are caught and displayed in a styled error banner.

**Loading state**\
A skeleton loader is shown on first load; the "Load more" button shows "Loading..." text while subsequent fetches are in progress.

Thank you.

_Prepared by Ashiwin Kumar_
