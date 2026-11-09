# raidr_web

Single-page landing site for [raidr](https://github.com/johnqh/raidr_extension) — the
capture extension, the reconstruction CLI, and the agent skill.

## Development

```bash
bun install
bun run dev        # http://localhost:5140 (strictPort)
bun run build      # tsc -b && vite build → dist/
bun run preview    # serve dist/ on http://localhost:4173
bun run typecheck  # tsc --noEmit
bun run format     # prettier --write "src/**/*.{ts,tsx,css}"
```

Bun only — do not use npm/yarn/pnpm (the lockfile is `bun.lock`). There is no
test suite: this is a static page, so verification is `bun run build` plus a
visual check at 1440px and 390px.

### Dependencies require GitHub Packages auth

The `@sudobility/*` packages (`design`, `seo_lib`) are hosted on GitHub Packages
— `.npmrc` points the `@sudobility` scope at `https://npm.pkg.github.com`, which
requires authentication even to read. Before a fresh `bun install`, make a
GitHub personal access token with `read:packages` available to the installer,
e.g.:

```bash
export BUN_AUTH_TOKEN=<token>   # or add //npm.pkg.github.com/:_authToken=<token> to ~/.npmrc
```

## Deployment

Cloudflare Pages, via `wrangler.toml` (`name = "raidr"`,
`pages_build_output_dir = "./dist"`). Build command `bun run build`.

`functions/_middleware.js` is a Cloudflare Pages Function
(`@sudobility/seo_lib/middleware`) that injects prerendered SEO snapshots into
the live `index.html` shell, canonicalizes trailing slashes, and tags bare-shell
routes `noindex`.

## SEO & prerendering

`bun run generate` runs the SEO/snapshot pipeline (it pulls helper scripts from
[`johnqh/workflows`](https://github.com/johnqh/workflows) at runtime):

- `process:static` — process static files
- `generate:sitemap` — write `public/sitemap.xml` / `robots.txt` from `seo.config.mjs`
- `prerender:install` — install Playwright Chromium
- `prerender` (`scripts/prerender.mjs`) — drive the **running** dev app with
  headless Chromium and write committed content snapshots to `public/html/<route>/`

The prerender step needs the app running first (`bun run dev`); it drives
`http://localhost:5140` by default (override with `GENERATE_ORIGIN`).

## Localization

`react-i18next` is wired with the same 15-locale list the other sudobility
landing pages use, but only `public/locales/en/translation.json` is populated.
A missing locale falls back to `en`, so adding a language is just adding a file
— no code change.

Copy lives in the locale file. Code blocks and technical identifiers stay in the
components: `raidr reconstruct` is not a phrase to translate.

## Content policy

Every code block and every number on the page is copied from a real run — the
hero's capture plate is actual request data from
`raidr_cli/fixtures/bundles/react-sample.zip`, and the CLI output block is that
bundle's real reconstruct report. If the tools change, re-run them and update
the page rather than editing the numbers.

## The raidr project

| Repository | Role |
|---|---|
| [`raidr_processor`](https://github.com/johnqh/raidr_processor) | Bundle format and pure analysis |
| [`raidr_extension`](https://github.com/johnqh/raidr_extension) | Chrome MV3 extension that performs the capture |
| [`raidr_cli`](https://github.com/johnqh/raidr_cli) | Reconstruction CLI and the agent skill |
| [`raidr_crawler`](https://github.com/johnqh/raidr_crawler) | Headless crawler, API analysis, and the raidr-publish skill |
| [`raidr_types`](https://github.com/johnqh/raidr_types) | Shared wire types and zod schemas |
| [`raidr_client`](https://github.com/johnqh/raidr_client) | API client and TanStack Query hooks |
| [`raidr_lib`](https://github.com/johnqh/raidr_lib) | Business logic for the app |
| [`raidr_api`](https://github.com/johnqh/raidr_api) | MCP/skill/site catalog and hosted MCP server |
| [`raidr_app`](https://github.com/johnqh/raidr_app) | Catalog web app (raidr.app) |
| [`raidr_web`](https://github.com/johnqh/raidr_web) | Landing site — this repo |

## License

BUSL-1.1 — see [LICENSE.md](LICENSE.md).
