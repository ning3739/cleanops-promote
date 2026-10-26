# CleanOps marketing site

The public site at `cleanops.nz`: home, pricing, the field app page, help, privacy and terms. It is a static site built
with TanStack Start, prerendered at build time and served from Cloudflare Workers. It shares the product's design tokens
and font, not its components (design guide §0.4 in `cleanops/docs/CleanOps-界面设计指南.md`).

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # prerenders every page into dist/
npm run preview        # serve the build (restart it after every build)
npm run check          # Biome
npm run typecheck
```

## Where things live

| What | Where |
|---|---|
| Company name, NZBN, support email, store links | `src/site.ts` — search for `PLACEHOLDER` before launch |
| Prices and plan features | `src/content/plans.json`, generated; never type a price into a page |
| FAQ | `src/content/faq.ts` |
| Screens and the recording | `public/screens/*.webp`, `public/media/how-it-works.webm`, listed in `src/content/screens.ts` |
| Colours, radii, type | `scripts/tokens.json` → `src/styles/tokens.css` (`npm run tokens`) |
| The iPhone frame around phone captures | `.iphone*` in `src/styles.css` |
| App Store and Google Play badges | `public/badges/`, the stores’ official files, unaltered |
| Photographs of cleaning work | `public/photos/`, from Unsplash (Unsplash License); credits in `src/content/photos.ts`. They set the scene only — never name or quote the people in them as customers |

## Prices come from the backend

`npm run sync-plans` reads the launch catalogue in `cleanops/app/services/subscriptions/plans.py` (the sibling
checkout, or `CLEANOPS_API_DIR`) and writes `src/content/plans.json`. `npm run check-plans` fails when the two differ;
run it locally when changing plans, with the backend checkout available. The comparison ignores JSON whitespace.
The pricing page, the comparison table, the FAQ and the JSON-LD offers all render from that file. Hosted CI does not
have access to the private backend repository and therefore does not check upstream catalogue changes.

## Deployment and CI/CD

Production: <https://cleanops.nz>. Repository: <https://github.com/ning3739/cleanops-promote>.
The Cloudflare Worker is `cleanops-promote`, in account `5ba1ad835c592acfaf24023a9271752c`.
`wrangler.jsonc` binds only `cleanops.nz`; `app.cleanops.nz` and mail DNS records are managed separately.

- Pull requests and pushes to `main` run `.github/workflows/ci.yml`: Node 24, `npm ci`, type checking, lint,
  production build, and a Wrangler deployment dry run.
- A successful CI run for a push to `main` starts `.github/workflows/deploy.yml`. It checks out that exact commit,
  runs the checks again, deploys to Cloudflare, then checks all seven public pages and key assets over HTTPS.
- Production runs are serialized. A superseded commit is skipped before deployment. Pull requests never deploy.
- The **Deploy to Cloudflare** workflow also supports manual runs on `main`, including the same checks.
- Revert a bad commit on `main` to trigger a checked deployment of the reverted code.

GitHub configuration (repository settings or the `production` environment):

| Type | Name | Value |
|---|---|---|
| Secret | `CLOUDFLARE_API_TOKEN` | Dedicated Cloudflare deployment token; never commit it |
| Variable | `CLOUDFLARE_ACCOUNT_ID` | `5ba1ad835c592acfaf24023a9271752c` |

Use the Cloudflare **Edit Cloudflare Workers** token template, scoped to the `ningli3739` account and the
`cleanops.nz` zone. It must allow Workers Scripts editing, Workers Routes editing and Zone reading; a DNS-only
token cannot publish Workers. Store the token in GitHub Actions secrets, not a workflow file or `.env` committed to Git.
See [Cloudflare's GitHub Actions guide](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)
and [custom domain guide](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

For a local deployment with a suitable token already in the environment:

```bash
npm run typecheck
npm run lint
npm run deploy
npm run smoke -- https://cleanops.nz
```

## Before launch

- `src/site.ts`: the NZBN (a real one has 13 digits), the legal company name, the App Store id and the Play package
  name. `stores.live` is `true`, so the field app page shows no "coming soon" note; the Smart App Banner appears once
  `appStoreId` is a real id. The package name must match `cleanops-mobile/app.json` and
  `cleanops-web/src/shared/env.ts`, which disagree today.
- Privacy and terms are plain-language drafts written from the product's rules. Have them reviewed, then set
  `legalReviewed` and `legalUpdated` in `src/site.ts`; until then both pages show a draft notice.
- Confirm the Cloudflare deployment token has Worker and zone permissions before the first publish.
- The portal captures show `localhost` in Safari's address bar; recapture them against staging or production.

## The film

`public/media/how-it-works.mp4` (50 s, 1080p) is real CleanOps screens animated: `scripts/film/story.html` is the
storyboard, scenes driven by the Web Animations API on one timeline, and `scripts/film/render.mjs` screenshots it frame
by frame and encodes it with ffmpeg. To change a scene, edit the storyboard, open it in a browser and call
`seek(seconds)` in the console to check a moment, then render.

The music is "Upbeat Happy Corporate" by kornevmusic, from Pixabay under the Pixabay Content License (commercial use,
no attribution required): pixabay.com/music/corporate-upbeat-happy-corporate-487426. The film starts when the visitor
presses "Watch the overview", with native playback controls. Its caption track identifies the instrumental soundtrack;
there is no spoken dialogue.

## Screenshots and the recording

Every screen on the site is the real product, captured from the development seed (Sparkle Cleaning,
`cleanops/scripts/seed_development.py`): the office web app with Playwright, the field app and the customer portal (in
Safari) from the iOS Simulator. Captures remove only development chrome — the trial banner, the "Development" badge,
the Expo tools button and, on the invoice, the "Xero is disconnected" banner, because the demo company has no Xero
connection. Photos in the demo are grey placeholders; use real job photos when a customer agrees to it.

To capture again: seed a separate database, run the API (with `CLEANOPS_DATABASE__URL` pointing at it), a Celery
worker for `cleanops.default,cleanops.billing` (approval drafts the invoice through it), and `cleanops-web` with
`API_INTERNAL_URL=http://localhost:8000 CLOUDFLARE_INCLUDE_PROCESS_ENV=true` — its own `.env` points at production. Sign
in as the seed's e2e admin, which has a fixed authenticator secret. The recording approves a job, so record last.
Save desktop captures at 1600×1000 and phone captures at 603×1311, as WebP.
