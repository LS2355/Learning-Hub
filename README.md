# Learning Hub

A personal workspace for learning data structures and algorithms, built with React and Vite. Navigation stays on the left, including a compact rail on phones.

## Run locally

Use Node.js 22.12+ (or 24).

```sh
cd client
npm ci
npm run dev
```

Open http://127.0.0.1:8008/Learning-Hub/.

```sh
npm run test
npm run lint
npm run build
npm run preview
```

## Features

- 25 searchable concepts, category and completion filters, grid/list views, and saved topics.
- Lesson explanations, JavaScript references, visual walkthroughs, and external resources.
- Practice tracker with a 41-problem catalog, custom LeetCode URLs, status and difficulty filters, sorting, notes, removal with undo, and an isolated demo collection.
- Progress dashboard with actual recorded activity, a daily streak, and suggested learning paths.
- Focus sessions with pause, resume, and configurable duration.
- Light/dark/system themes, ten accents, density controls, and reduced motion support.
- Validated JSON export/import and reset confirmation.
- Theme-aware outline logo loader, with a pausable, three-size preview in Appearance.

## Data and deployment

Progress stays in browser local storage. Existing legacy practice data is migrated on first use. Export a backup before clearing browser data or moving devices. Storage failures are reported without silently overwriting unreadable data.

The client requires no backend. It does not sync LeetCode submissions, execute lesson code, or create user accounts. Practice links open LeetCode; statuses are recorded manually. The original experimental GraphQL proxy remains in server/ for reference and is not used by the rebuilt client.

Hash-based routes work on static hosting and survive refreshes. The Vite base remains /Learning-Hub/ for GitHub Pages. Deployment is configured in .github/workflows/deploy.yml.

## Appearance and logo loader

Open **Appearance** in the left sidebar. Theme mode (dark, light, or system) and accent color are independent. Available accents: mint, blue, violet, amber, rose, coral, cyan, lime, lavender, and slate. Color preferences survive reloads and backup export/import.

The reusable loader preserves both contours of the Learning Hub logo. A faint outline sits beneath a constant-width highlight whose tail fades along the path. On each full page load, a full-screen startup splash traces the logo once while fading its full-color fill from 0% visibility to 100% brightness in sync with animation progress, reveals “Learning Hub” with the same overlapping smoke-and-letter treatment as the Supa Controller site, and fades into the workspace after approximately 2.5 seconds. Sidebar navigation does not replay it. Skip intro or Escape dismisses it immediately; reduced motion uses a brief static introduction. It also appears during the real lazy-loading boundary for Appearance. Open Appearance to see the continuous preview at three sizes and pause/resume it.

```jsx
import { LogoOutlineLoader } from './components/LogoOutlineLoader';

<LogoOutlineLoader size={64} />
<LogoOutlineLoader size={48} color="#9fc5fc" duration={1200} trailLifetime={216} />
<LogoOutlineLoader paused label="Learning Hub" />
```

`duration` is the full cycle in milliseconds. The default cycle is approximately 976 ms, with an 800 ms head lap and an 18% delayed tail. `trailLifetime` must be positive and shorter than the cycle. SVG gradient and mask IDs are unique per instance. Animation stops in hidden tabs and on unmount; reduced motion renders a readable static outline.

Shared logo geometry and timing are in `client/src/lib/logo-trace.js`; palette names are in `client/src/data/themes.js` and color roles in `client/src/index.css`. See [DESIGN.md](DESIGN.md) for interface constraints and motion guidance.
