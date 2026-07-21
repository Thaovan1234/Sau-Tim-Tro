import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Official TanStack Start + Nitro setup for Vercel.
// Avoid Cloudflare / Lovable deploy plugins — they conflict with Vercel Functions.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // Branded SSR error wrapper in src/server.ts
      server: { entry: "server" },
    }),
    // Vercel CI sets VERCEL=1 and Nitro auto-selects the vercel preset,
    // writing proper Build Output API under .vercel/output.
    // Local builds use node-server so `vite preview` can serve SSR.
    nitro(
      process.env.VERCEL
        ? {
            // Stay on Node 20 — more widely available on Vercel than 24.
            vercel: { functions: { runtime: "nodejs20.x" } },
          }
        : { preset: process.env.NITRO_PRESET || "node-server" },
    ),
    viteReact(),
  ],
});
