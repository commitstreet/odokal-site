# Odokal website

Coming-soon site for Odokal: landing page, beta waitlist, privacy, terms, and the fallback page for crew invite links.

Next.js 16, static export (`output: "export"`), Tailwind 4. No server, no cookies, no analytics. Fonts are self-hosted by `next/font`.

## Develop

```
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm build        # static site in out/
```

## Settings (build-time)

| Variable | Effect when empty |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Defaults to `https://odokal.commitstreet.com` (canonical URLs, sitemap) |
| `NEXT_PUBLIC_WAITLIST_ENDPOINT` | Waitlist form is shown disabled with "Beta sign-ups open soon" |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact address hidden in footer and privacy page |

On GitHub, set `WAITLIST_ENDPOINT` and `CONTACT_EMAIL` as repository variables; the deploy workflow passes them to the build.

The waitlist endpoint receives `POST {"email": string, "city"?: string}` as JSON and must answer 2xx. It needs CORS for the site's origin.

## Deploy (GitHub Pages)

The website lives in the monorepo at `apps/web` and is published from a separate public repo, `vineyrawat/odokal-site`, so the backend and app stay private.

1. `./scripts/publish.sh` copies the site into `~/Projects/odokal-site` (override with `ODOKAL_SITE_REPO`).
2. Commit and push there. `.github/workflows/deploy.yml` builds and deploys to Pages.

Hosting notes:
- `public/CNAME` sets the custom domain `odokal.commitstreet.com`. DNS: a `CNAME` record for `odokal` on commitstreet.com pointing to `vineyrawat.github.io`.
- `public/.nojekyll` stops GitHub from hiding the `_next/` folder.
- GitHub Pages has no rewrites, so crew invite links (`/i/<code>`) are served by `404.html`, which shows the invite page for those paths.

## Before launch

- Publish the app privacy policy and terms (the current pages cover only the website and waitlist).
- Add `public/.well-known/assetlinks.json` with the release signing certificate's SHA-256 so invite links open the Android app.
- Add the Play Store link once the listing exists.
