import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A package-lock.json in a parent folder would otherwise be picked as the workspace root.
  turbopack: { root: path.resolve(".") },
  reactStrictMode: true,
  // Self-contained server (`.next/standalone/server.js`) for the cPanel Node.js app.
  output: "standalone",
  // The build is made on macOS and runs on Linux, so skip the platform-specific `sharp` optimizer.
  images: { unoptimized: true },
  experimental: {
    // Admin image uploads go through Server Actions (a cropped image plus its original).
    serverActions: { bodySizeLimit: "20mb" },
    // proxy.ts runs on /admin, and by default it silently cuts request bodies at 10 MB — which broke
    // large image uploads before they reached the Server Action. Keep this in step with the limit above.
    proxyClientMaxBodySize: "20mb",
  },
};

export default nextConfig;
