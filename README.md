# Pika Op Watches

Public storefront and owner-protected admin built from the supplied Pika Op catalog and desktop motion brief.

- `public/`: storefront, theme, admin and scroll-player source.
- `worker.mjs`: authenticated API and website delivery.
- `db/schema.ts`, `drizzle/`: persistent catalog and order schema.
- `PRODUCTION-NOTES.md`: verified functionality and remaining merchant-payment dependencies.
- `public/watch-sequence.json`: Higgsfield film, poster and optimized atlas URLs. Original movie and atlas copies are retained locally in ignored `media-source/film/`.

Use Node 24 for development. Run `npm install`, `npm run build`, then `node dev.mjs`. For a local administrator preview only, use `node dev.mjs --admin-preview`. This local identity bypass is never included in the deployed Worker.

Run `node --test --test-isolation=none tests/server.test.mjs` and `node check.cjs` for the database, authorization and catalog checks. Generate new migrations with `npm run db:generate` only when the schema changes.

Product and copy changes saved through `/admin` are stored in D1 and shown on the storefront. The cart remains browser-local. The admin account is the store owner's ChatGPT sign-in, configured through the secret ADMIN_EMAIL setting.

The hero uses a generated Higgsfield watch film with native scroll-controlled frames, an exposed-parts hold and reverse reassembly. Catalog photographs remain illustrative Unsplash references reused across fictional models: replacement generation was rejected for insufficient workspace credits. Live payment connections are not complete and no real payment is accepted. Original reference sources: https://unsplash.com/photos/a-black-watch-with-a-white-second-hand-3MzhWXiYFEg ; https://unsplash.com/photos/black-and-silver-analog-watch-8xg3pB9V-O4 ; https://unsplash.com/photos/black-and-silver-analog-watch-el44aDkmles ; https://unsplash.com/photos/a-close-up-of-a-watch-on-a-black-background-Y5rPeqaYUBM ; https://unsplash.com/photos/a-watch-sitting-on-top-of-a-black-cloth-B6z8FAfi7zY
