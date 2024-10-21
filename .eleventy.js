import paths from "./config/paths.js";

export default function (eleventyConfig) {
	
	eleventyConfig.addPassthroughCopy("assets");

	return {
		markdownTemplateEngine: "njk",
		dir: {
		  input: paths.src,
		  includes: "_includes",
		  layouts: "_layouts",
		},
	}
};