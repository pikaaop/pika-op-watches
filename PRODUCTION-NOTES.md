# Atelier upgrade status

## Delivered in this revision
- Revised dark atelier styling, full-screen watch composition and themed storefront sections.
- Protected `/admin` with Sites-owned ChatGPT sign-in; server-side owner email allowlist in the secret `ADMIN_EMAIL` setting. No client-side administrator password or public mutation endpoint.
- Persistent D1 catalog and copy editing. Save conflicts are rejected using a revision number. Form input stays visible after errors.
- Orders database, protected order list and sequential fulfillment updates restricted to confirmed paid orders.
- The payment setup page identifies JazzCash, Easypaisa, PayPal and Binance Pay as unconfigured. No payment integration or real order creation is active. The checkout endpoint returns unavailable and never invents success.
- Tests use an actual in-memory SQLite database with the generated D1 migration. Anonymous access, wrong account, missing allowlist, cross-origin writes, save conflicts, invalid prices, persistence, fulfillment and disabled checkout were checked. Local admin saving and storefront filtering were checked in the browser.

## Remaining dependencies
Higgsfield became available on September 14. Hero still job b3a551a0-0531-449b-9343-a0ee73089176 and reference video job 18480906-2f94-491c-9350-abcadc5bf502 completed. The opening, intermediate and separated-parts frames were visually inspected. This is a concept visualization, not an engineering specification. All six additional catalog photography requests were rejected for insufficient credits; no catalog generation jobs were created.

The scroll player in public/cinematic.js consumes public/watch-sequence.json. A 12.042-second 1920x1080 original was sampled at 20fps into 240 frames, packed into fifteen 4x4 JPEG atlases (960x540 per frame; 9.4MiB total) on the Higgsfield CDN. The browser retains at most two decoded atlases, requests the current and adjacent atlas, caps canvas DPR at 1.5 and falls back to the poster on repeated loading failures or reduced motion. Frame 200 is the final hold. Desktop active scroll travel is 550vh: 10% opening hold, forward motion through 59%, exposed-parts hold to 72%, exact frame reversal to 96%, assembled closing hold. Mobile active travel is 500vh with responsive framing. The complete original and atlases are retained in ignored media-source/film; permanent source and asset URLs are in the manifest.

Real payments require confirmed business country, merchant gateway/API access, an agreed live currency and real sale-ready products. User named JazzCash, Easypaisa, PayPal and Binance. No credentials are in this repository. Do not infer merchant approval from having a consumer wallet account. Connect and test the chosen providers, verify payment callbacks server-side and populate orders only from confirmed payment events before enabling checkout.

## Development
Source files are in public/, worker.mjs and db/schema.ts. Run npm install, npm run db:generate after schema changes, then npm run build. Node 24 is used for local SQLite preview/testing: node --test --test-isolation=none tests/server.test.mjs and node dev.mjs. `node dev.mjs --admin-preview` enables a loopback-only test identity in the local server; this dev file is not included in the Worker artifact. Preview data stays in ignored .sites-runtime/preview.sqlite and is never deployed.

Production changes use the existing project ID in .openai/hosting.json. Keep the owner admin setting private. Future migrations must be additive after this initial migration has deployed.
