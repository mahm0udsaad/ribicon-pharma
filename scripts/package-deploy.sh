#!/usr/bin/env bash
# Builds the standalone server and packs it for the cPanel Node.js app.
# Output: ribicon-app.tar.gz  (extract into the app root, e.g. /home/ribiconpharma/ribicon-app)
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf .next
npm run build
cp -r public .next/standalone/public
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/static
# sharp is only loaded for image optimization, which is off (images.unoptimized); its macOS binaries can't run on Linux anyway.
rm -rf .next/standalone/node_modules/sharp .next/standalone/node_modules/@img
mkdir -p .next/standalone/db
cp db/schema.sql db/seed.sql .next/standalone/db/

# Files must be world-readable or the web server answers 403 (e.g. a 0600 logo).
chmod -R a+rX .next/standalone

# Linux-safe archive: no macOS extended attributes.
COPYFILE_DISABLE=1 tar --no-xattrs -czf ribicon-app.tar.gz -C .next/standalone . 2>/dev/null \
  || COPYFILE_DISABLE=1 tar -czf ribicon-app.tar.gz -C .next/standalone .
ls -lh ribicon-app.tar.gz
