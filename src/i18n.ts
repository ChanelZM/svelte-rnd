import { init, register } from "svelte-i18n";

register("en", async () => {
  const en = await import("./locales/en.json");
  return en;
});

register("nl", async () => {
  const nl = await import("./locales/nl.json");
  return nl;
});

register("pl", async () => {
  const pl = await import("./locales/pl.json");
  return pl;
});

function getLocaleFromPath() {
  if (typeof window !== "undefined") {
    const pathParts = window.location.pathname.split("/").filter(Boolean); // Filter out empty strings

    if (pathParts.length === 0) {
      return "en"; // Default to 'en' if the path is "/"
    }

    return pathParts[0]; // Return the first part of the path (the locale)
  }

  return "en"; // Default for SSR or if window is not defined
}

// Initialize the svelte-i18n with the extracted locale
await init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromPath(),
});
