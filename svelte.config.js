import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { spawnSync } from "child_process";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    connect-src 'self' https://*.mockapi.io;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      "$services/*": "src/core/services/*",
      "$components/*": "src/components/*",
      "$connectors/*": "src/connectors/*",
      "$stores/*": "src/core/stores/*",
      "$utils/*": "src/utils/*",
      "$models/*": "src/core/models/*",
      "$styles/*": "src/styles/*",
      "$examples/*": "examples/*",
      "$mixins/*": "src/styles/mixins/*",
      "$static/*": "static/*",
      "$src/*": "src/*",
    },
    version: {
      name: `${
        spawnSync("git rev-parse HEAD", { encoding: "utf-8", shell: true })
          .stdout || Date.now()
      }`.trim(),
    },
  },
  vitePlugin: { inspector: true },
  async headers() {
    return [
      {
        source: "/(.*)?", // Headers for all pages
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};
