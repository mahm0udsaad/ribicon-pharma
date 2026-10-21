# Deploying to cPanel (Node.js app + MariaDB)

The site runs as a Next.js standalone server under cPanel's **Setup Node.js App** (Passenger), with content
in a MariaDB database on the same host. The admin panel is at `/admin`.

## What's where on the host

| Thing | Location |
|---|---|
| App code | `/home/ribiconpharma/ribicon-app` (from `ribicon-app.tar.gz`) |
| Uploaded images | `/home/ribiconpharma/ribicon-uploads` (survives redeploys) |
| Database | `ribiconpharma_site` on `localhost` (MariaDB 10.6) |

## First deployment

1. **Database** — cPanel → *Manage My Databases*:
   - Create database `site` (becomes `ribiconpharma_site`).
   - Create user `site` (becomes `ribiconpharma_site`) with a long **letters-and-digits** password
     (avoid symbols: the password goes inside a URL).
   - *Add User To Database* → ALL PRIVILEGES.
2. **Tables and content** — cPanel → *phpMyAdmin* → select `ribiconpharma_site` → *Import*:
   import `db/schema.sql`, then `db/seed.sql` (both are inside the app folder after step 3, or in this repo).
3. **Code** — build locally with `npm run package`, upload `ribicon-app.tar.gz` to
   `/home/ribiconpharma/ribicon-app` in File Manager and extract it there.
4. **Free the web root** — Apache serves real files in `public_html` before the app sees the request, so move
   the old static export (`index.html`, `_next/`, `about/`, … everything except `.well-known`, `cgi-bin`,
   `.htaccess`, `.user.ini`, `php.ini`) out of `public_html` (e.g. to `~/static-site-backup`), and reduce
   `public_html/.htaccess` back to only the cPanel-generated PHP block (cPanel adds the Passenger lines itself).
5. **Node.js app** — cPanel → *Setup Node.js App* → *Create Application*:
   - Node.js version **22.x**, Application mode **Production**
   - Application root `ribicon-app`, Application URL `ribiconpharma.com` (leave the path empty)
   - Application startup file `server.js`
6. **Environment variables** (same screen) — then click *Restart*:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | `mysql://ribiconpharma_site:<password>@localhost:3306/ribiconpharma_site` |
   | `SESSION_SECRET` | output of `openssl rand -hex 32` |
   | `ADMIN_PASSWORD_HASH` | output of `npm run admin:hash-password -- "<admin password>"` (the `scrypt:…` part) |
   | `UPLOAD_DIR` | `/home/ribiconpharma/ribicon-uploads` |
   | `INSECURE_COOKIES` | `1` **only until HTTPS works**, then delete it (admin login needs HTTPS otherwise) |

7. Open `https://ribiconpharma.com/admin` and sign in.

## Updating the site later

1. `npm run package` locally.
2. Upload and extract `ribicon-app.tar.gz` into `/home/ribiconpharma/ribicon-app` (overwrite).
3. *Setup Node.js App* → *Restart*.

Database content and uploaded images are not touched by a code update. If a release changes `db/schema.sql`,
apply the change in phpMyAdmin before restarting.

## Local development

```bash
cp .env.example .env.local   # fill in values
mariadb -u "$USER" -e "CREATE DATABASE ribicon_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
mariadb -u "$USER" ribicon_dev < db/schema.sql
mariadb -u "$USER" ribicon_dev < db/seed.sql
npm run dev
```

`db/seed.sql` is generated from `db/seed-data/` with `npm run db:seed-sql` (it replaces categories, products
and slides — never run it against production after launch).
