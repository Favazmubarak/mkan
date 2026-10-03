# MKAN Concept

A Next.js digital flagship and private admin studio for MKAN Concept. The public site is a single-page experience; `/admin` contains the protected content editor, portfolio manager, and inquiry inbox.

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- MongoDB Atlas with Mongoose for admin sessions, CMS content, projects, media metadata, and inquiries
- Resend for contact notifications; Sharp and Cloudflare R2 for production image uploads
- GSAP/ScrollTrigger and Lenis for motion and smooth scrolling

## Local setup

1. Install dependencies with `npm install`.
2. Create `.env.local` with the values below. A local MongoDB URI is also accepted by the seed scripts.
3. Run `npm run seed` to create the admin account and seed the initial content, then start the app with `npm run dev`.

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/mkan_concept
ADMIN_DEFAULT_EMAIL=admin@example.com
ADMIN_DEFAULT_PASSWORD=replace-with-a-private-password-of-12-or-more-characters

# Contact notifications (recommended)
RESEND_API_KEY=
CONTACT_EMAIL_TO=
CONTACT_EMAIL_FROM=

# Optional stable secret for keyed rate-limit identities; otherwise MONGODB_URI is used.
RATE_LIMIT_HASH_SECRET=

# Required only if the production Studio will upload or replace images.
R2_BUCKET_NAME=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_ENDPOINT=
R2_PUBLIC_DOMAIN=
```

`ADMIN_DEFAULT_PASSWORD` must be at least 12 characters and no more than 72 UTF-8 bytes. Keep `.env.local` private and use separate production secrets. The public homepage can render seed content without MongoDB, but admin access and CMS operations require a working database. The Studio accepts original images up to 15 MB, compresses images larger than 4 MB in the browser, and submits the optimized file under Vercel's request limit.

## Commands

- `npm run dev` — start the development server.
- `npm run build` — create a production build.
- `npm start` — serve the production build.
- `npm run lint` — run ESLint.
- `npm run typecheck` — run TypeScript static type checking.
- `npm test` — execute automated unit and integration tests.
- `npm run seed` — seed the initial admin and content. This resets the configured admin password and revokes existing admin sessions.
- `npm run admin:reset-password -- admin@example.com` — reset an admin password using `ADMIN_DEFAULT_PASSWORD` from `.env.local` or the process environment. This revokes existing sessions.

## Production notes

- Configure MongoDB before deployment. Configure Resend if the team needs email notifications. Configure all five R2 values before using image uploads in the production Studio; those uploads fail closed without R2.
- The admin route group verifies sessions on the server; each mutation also checks authorization in its server action.
- Contact records are configured for automatic deletion after 30 days. A privacy notice is available at `/privacy`.
- Set `RATE_LIMIT_HASH_SECRET` to a stable secret across instances if you do not want rate-limit hashes derived from the MongoDB connection string.

## Content and assets

- Public content defaults live in [`src/content/home.ts`](src/content/home.ts) and [`src/content/site.ts`](src/content/site.ts).
- Image slots and fallback assets are listed in [`src/config/assets.ts`](src/config/assets.ts); replacement guidance is in [`ASSETS.md`](ASSETS.md).
- Admin routes are separated into public login and protected studio route groups under `src/app/(auth)` and `src/app/(studio)`.
