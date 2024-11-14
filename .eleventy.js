import paths from "./config/paths.js";

import { outputStylesheet } from "./config/sass.js";
import { cachebustAssetUrl, formatDate } from "./config/utils.js";

export default function (eleventyConfig) {
    //Turn off default log output
    eleventyConfig.setQuietMode(true);

    //Ignore the blog drafts directory if this is a production build
    if (process.env.ENVIRONMENT === "prod") {
        eleventyConfig.ignores.add(paths.src + "/blog/drafts/**/*");
    }

    //Assets
    eleventyConfig.addPassthroughCopy(paths.srcAssets + "/img");
    eleventyConfig.addPassthroughCopy(paths.srcAssets + "/fonts");
    eleventyConfig.addPassthroughCopy(paths.srcAssets + "/js");

    //.htaccess
    eleventyConfig.addPassthroughCopy(paths.src + "/website/.htaccess");

    //Watch and compile Sass files
    eleventyConfig.addWatchTarget(paths.srcAssets + "/**/*.scss");
    eleventyConfig.on("beforeBuild", outputStylesheet);

    //Filters
    eleventyConfig.addFilter("cachebust", cachebustAssetUrl);
    eleventyConfig.addFilter("formatDate", formatDate);

    return {
        markdownTemplateEngine: "njk",
        dir: {
            input: paths.src + "/website",
            includes: "_includes",
            layouts: "_layouts",
        },
    };
}
