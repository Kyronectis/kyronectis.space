import { DateTime } from "luxon";

/**
 * Generate a string we can use for asset cachebusting
 *
 * @param {string} url - The URL to cachebust.
 * @returns {string} - The URL with a cachebusting query string parameter
 *   appended to it.
 *
 * @author Rob Hudson
 * @tutorial https://rob.cogit8.org/posts/2020-10-28-simple-11ty-cache-busting/
 */
const cachebustAssetUrl = function (url) {
  const [urlPart, paramPart] = url.split("?");
  const params = new URLSearchParams(paramPart || "");
  params.set("v", DateTime.local().toFormat("X"));
  return `${urlPart}?${params}`;
};

export { cachebustAssetUrl };
