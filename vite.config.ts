// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { staticDeployment } from "./src/lib/static-deployment";

const githubPages = process.env.GITHUB_PAGES === "true";
const deployment = staticDeployment(githubPages);

export default defineConfig({
  vite: {
    base: deployment.base,
    // Only CI uses this layout. Lovable keeps its own managed output settings.
    ...(githubPages ? {
      environments: {
        client: { build: { outDir: deployment.publicDir } },
        ssr: { build: { outDir: deployment.serverDir } },
      },
    } : {}),
  },
  // TanStack's own build-time renderer produces HTML; no Nitro server is
  // required or uploaded to GitHub Pages. Lovable retains its Nitro defaults.
  ...(githubPages ? { nitro: false as const } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: { basepath: deployment.base },
    pages: [{ path: deployment.base }],
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: false,
      crawlLinks: false,
      failOnError: true,
    },
  },
});
