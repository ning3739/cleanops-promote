import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Every page is prerendered to static HTML at build time; the Worker only serves files (README, "Deploying").
const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				crawlLinks: true,
				failOnError: true,
				// Only pages: the crawler would otherwise "render" the video and anchors too.
				filter: ({ path }) => !path.includes("#") && !/\.[a-z0-9]+$/i.test(path),
			},
		}),
		viteReact(),
	],
});

export default config;
