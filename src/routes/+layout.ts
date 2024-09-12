import { redirect } from "@sveltejs/kit";

export const prerender = true;

export function load({ url }) {
  const { pathname } = url;

  if (pathname === "/") {
    throw redirect(302, "/en");
  }

  return {};
}
