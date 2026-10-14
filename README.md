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

On GitHub, set `SITE_URL` (e.g. `https://odokal.commitstreet.com`), `WAITLIST_ENDPOINT` and `CONTACT_EMAIL` as repository variables; the deploy workflow passes them to the build.

## Waitlist (Google Sheet)

Sign-ups go to a private Google Sheet through a small Google Apps Script web app ([`scripts/waitlist-apps-script.gs`](scripts/waitlist-apps-script.gs)). Free, no limits worth worrying about, and the data stays in your Drive.

1. Create a Google Sheet (e.g. "Odokal waitlist") in the account that should own the data.
2. In the sheet: **Extensions → Apps Script**. Replace the editor's contents with `scripts/waitlist-apps-script.gs` and save.
3. **Deploy → New deployment → Web app.** Execute as: **Me**. Who has access: **Anyone**. Authorize when asked.
4. Copy the **Web app URL** (ends in `/exec`). Opening it in a browser should show `{"ok":true,"service":"odokal-waitlist"}`.
5. In the `commitstreet/odokal-site` repo: **Settings → Secrets and variables → Actions → Variables**: set `WAITLIST_ENDPOINT` to that URL, and `CONTACT_EMAIL` (the privacy page needs it once the waitlist is open). Re-run the deploy.

The first sign-up creates a `Waitlist` tab with the columns Joined, Updated, Email, Name, City, Bike, Crew, Crew name, Source. Signing up again with the same email updates that row, which is how the optional "tell us more" step fills in details.

What the form sends (JSON as `text/plain`, so the browser skips the CORS preflight Apps Script can't answer):

| Field | When |
|---|---|
| `email` | always |
| `city` | optional, step one (full form) or step two |
| `source` | step one: `hero`, `footer` or `invite` |
| `name`, `bike`, `crew` (`have_crew` / `find_crew` / `solo`), `crewName` | optional, step two |
| `website` | honeypot; any value and the script ignores the request |

To change the script later, edit it in Apps Script and use **Deploy → Manage deployments → Edit → New version**, so the URL stays the same.

## Deploy (GitHub Pages)

The website lives in the monorepo at `apps/web` and is published from a separate public repo, `commitstreet/odokal-site`, so the backend and app stay private.

1. `./scripts/publish.sh` copies the site into `~/Projects/odokal-site` (override with `ODOKAL_SITE_REPO`).
2. Commit and push there. `.github/workflows/deploy.yml` builds and deploys to Pages.

Hosting notes:
- `public/CNAME` sets the custom domain `odokal.commitstreet.com`. DNS: a `CNAME` record for `odokal` on commitstreet.com pointing to `commitstreet.github.io`.
- `public/.nojekyll` stops GitHub from hiding the `_next/` folder.
- GitHub Pages has no rewrites, so crew invite links (`/i/<code>`) are served by `404.html`, which shows the invite page for those paths.

## Before launch

- Publish the app privacy policy and terms (the current pages cover only the website and waitlist).
- Add `public/.well-known/assetlinks.json` with the release signing certificate's SHA-256 so invite links open the Android app.
- Add the Play Store link once the listing exists.
