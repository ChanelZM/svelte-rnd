/* @svelte/adapter-node start */
// import { env } from "$env/dynamic/private";
//
// const robots = env.robots;
/* @svelte/adapter-node end */

/* @svelte/adapter-static start */
const robots = import.meta.env.VITE_robots;

export const prerender = true;
/* @svelte/adapter-static end */

/**
 * Enable or disable indexing of the site.
 *
 * @link https://www.robotstxt.org/robotstxt.html
 */
export const GET = () => {
  let allow = true;

  if (robots === "noindex") {
    allow = false;
  } else if (robots !== "index") {
    console.warn("Invalid robots env, expecting 'noindex' or 'index'");
  }

  return new Response(`User-agent: *
Disallow:${allow ? "" : " /"}
`);
};
