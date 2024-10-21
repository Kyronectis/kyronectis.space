import paths from "./paths.js";

import { mkdir, writeFile } from "node:fs/promises";
import * as sass from "sass";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";
import postcssCssNano from "cssnano";

/**
 * Synchronously compile sass by passing it first through the Sass compiler and
 * then PostCSS.
 */
const compileSass = function () {
  return sass.compile(paths.srcSass + "/stylesheet.scss", {
    sourceMap: false,
    outputStyle: "expanded",
  });
};

const outputStylesheet = function () {
  const result = compileSass();
  let css = result.css.toString();

  postcss([postcssPresetEnv(), postcssCssNano()])
    .process(css, { from: "stylesheet.scss", to: "assets/scss/stylesheet.css" })
    .then(async (result) => {
      try {
        await mkdir(paths.outputSass, { recursive: true });
        await writeFile(paths.outputSass + "/stylesheet.css", result.css);
      } catch (err) {
        throw new Error(err);
      }
    });
};

export { outputStylesheet };
