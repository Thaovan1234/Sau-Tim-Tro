// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Outside Lovable sandbox the wrapper skips Nitro unless explicitly enabled.
// Vercel needs Nitro output (not Cloudflare). Force Nitro on for production builds.
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";
const nitroPreset =
  process.env.NITRO_PRESET || (isVercel ? "vercel" : "node-server");

// Redirect TanStack Start's bundled server entry to src/server.ts (SSR error wrapper).
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: nitroPreset,
  },
});
