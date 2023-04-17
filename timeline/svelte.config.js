import adapter from "@sveltejs/adapter-auto";
import sveltePreprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: null,
		}),
	},
	preprocess: sveltePreprocess({}),
};

export default config;
