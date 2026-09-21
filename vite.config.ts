import { fileURLToPath } from "node:url";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));

// Deployment target for the SSR build. `cloudflare-module` emits a Cloudflare
// Worker, which is what this site was previously deployed as. To move hosts,
// change this to the matching nitro preset — e.g. "vercel", "netlify",
// "node-server" — or set NITRO_PRESET in the build environment.
const NITRO_PRESET = process.env["NITRO_PRESET"] ?? "cloudflare-module";

export default defineConfig(({ command }) => ({
  // Tailwind v4 emits nesting/custom-property syntax that lightningcss handles
  // natively; this matches the CSS output the site was built with.
  css: { transformer: "lightningcss" },

  resolve: {
    alias: { "@": srcDir },
    // React and the TanStack packages must resolve to a single copy, or hooks
    // and query context break across the SSR/client boundary.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },

  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Route TanStack Start's bundled server entry through src/server.ts,
      // which wraps SSR failures that h3 would otherwise swallow into a
      // generic 500.
      server: { entry: "server" },
      // Fail the build if client code pulls in anything server-only.
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    // nitro only participates in the production build; on `vite dev` the
    // TanStack Start plugin serves SSR itself.
    ...(command === "build" ? [nitro({ preset: NITRO_PRESET })] : []),
    viteReact(),
  ],
}));
