import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import svg from "@poppanator/sveltekit-svg";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit(), svg()],
  css: { devSourcemap: true },
  server: {
    fs: {
      allow: [
        // Allow serving files from the project root and the examples directory
        path.resolve(__dirname),
        path.resolve(__dirname, "examples"),
      ],
    },
  },
});
