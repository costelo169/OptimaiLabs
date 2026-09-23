Welcome to your new TanStack Router app!

# Getting Started

To run this application:

```bash
pnpm install
pnpm dev
```

# Building For Production

To build this application for production:

```bash
pnpm build
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Remove `@tailwindcss/vite` and `tailwindcss` from `package.json`

## Linting & Formatting

This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for linting and formatting. Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint). The following scripts are available:

```bash
pnpm lint
pnpm format
pnpm check
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from '@tanstack/react-router'
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('')

  useEffect(() => {
    getServerTime().then(setTime)
  }, [])

  return <div>Server time: {time}</div>
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).

# The landing page

The page implements the OptimAI Labs design from Figma
(`IGgozQDhbVoP9qhFo8Kbft`, node `1840-3829`) — a fixed 1920 x 10828 canvas.

## How it is built

`src/components/sections/` holds one component per section, composed in
[index.tsx](src/routes/index.tsx). Shared pieces live in `src/components/ui/`:
the 1400px measure and its page rails, the dotted rule between sections, and the
six-slot progress marker that advances one slot per section.

Type and colour come from the design: Plus Jakarta Sans for display and body,
Geist Mono for labels, `#0f0f0f` ground, `#8cf2c1` accent. Tokens are declared
in the `@theme` block of [styles.css](src/styles.css).

Every illustration (the hero core, the arc, the hexagon, the timeline, the case
studies, the decision scenes, the closing light-burst) is cut from the Figma
render by `pnpm art:extract` into `public/art/`, on background-coloured edges so
each plate composites without a seam. The closing panel's artwork sits behind
live text in the design, so the extractor inpaints the text out of it.

Below 1920px the whole canvas scales rather than cropping or reflowing, driven
by [useCanvasScale](src/hooks/useCanvasScale.ts).

## Checking it against the design

```bash
pnpm check:visual
```

Renders the page at 1920 in Chromium and diffs it against
`design/reference/landing-1920.png`, reporting mismatch overall and per band so
it is obvious which section has drifted. Chromium is launched with
`--disable-lcd-text` because Figma renders text with grayscale antialiasing;
without that the diff measures a font-smoothing mode rather than the design.

Supporting tools: `tools/probe.mjs` compares where ink lands in both images,
`tools/outline.mjs` dumps the structure of a slice of the reference,
`tools/font-match.mjs` identifies a typeface by rasterising candidates against a
region, and `tools/bbox.mjs` / `tools/crop.mjs` measure and cut regions.

```bash
pnpm check:responsive
```

Reports horizontal overflow and page height at common viewport widths.

**Current state:** 1.44% of pixels differ at the design's own width, with the
page height matching exactly at 10828px. Structural probes match to within a
pixel or two throughout; what remains is glyph rasterisation — Figma and
Chromium place and hint the same typeface slightly differently, which shows up
as edge pixels on every line of text and cannot be closed without shipping the
text as images.

# Deploying to Cloudflare Pages

This app is a client-rendered SPA (TanStack Router in router-only mode, no
TanStack Start), so it deploys to Cloudflare Pages as static assets.

Relevant files:

| File              | Purpose                                                            |
| ----------------- | ------------------------------------------------------------------ |
| `wrangler.jsonc`  | Pages project name and `pages_build_output_dir` (`./dist`)         |
| `public/_headers` | Long-lived cache headers for the content-hashed files in `/assets` |

Anything in `public/` is copied verbatim into `dist/` by Vite, so `_headers`
ends up at the root of the deployed output where Pages expects it.

## Deep links and the SPA fallback

There is deliberately **no `_redirects` file**. Pages treats a deployment as a
single-page app whenever the output has no top-level `404.html`, and routes every
unmatched path to `/` so TanStack Router can resolve it on the client. The usual
`/* /index.html 200` rule is unnecessary here, and Wrangler rejects it as an
infinite loop because Pages normalizes `/index.html` back to `/`.

If you ever add a `404.html` to `public/`, Pages will switch to static-site
behavior and deep links such as `/about` will start 404ing.

## Preview the production build locally

```bash
pnpm cf-preview
```

This builds and serves `dist/` through Wrangler's local Pages runtime, which
applies the SPA fallback and `_headers` exactly as production does.

## Deploy from your machine

```bash
pnpm deploy
```

The first run prompts you to log in and to create the Pages project.

## Deploy from Git (recommended)

Connect the repository in the Cloudflare dashboard under **Workers & Pages →
Create → Pages → Connect to Git**, then set:

- Build command: `pnpm build`
- Build output directory: `dist`

Cloudflare detects pnpm from `pnpm-lock.yaml`. Add any `VITE_`-prefixed
environment variables under the project's build settings — they are inlined at
build time, so do not put secrets there.

## If you later need server-side code

Pages serves static assets only. For SSR, server routes, or API endpoints,
migrate to TanStack Start with the Cloudflare adapter, which targets Cloudflare
Workers rather than Pages.
