import assert from "node:assert/strict";
import { setTimeout } from "node:timers/promises";

const origin = new URL(process.argv[2] ?? "https://cleanops.nz").origin;
const canonicalOrigin = "https://cleanops.nz";
const pages = ["/", "/product", "/pricing", "/app", "/help", "/privacy", "/terms"];

async function check(path) {
	const response = await fetch(new URL(path, origin), {
		signal: AbortSignal.timeout(15_000),
		redirect: "manual",
	});
	assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
	return response;
}

for (let attempt = 1; attempt <= 6; attempt++) {
	try {
		for (const path of pages) {
			const response = await check(path);
			assert.match(response.headers.get("content-type") ?? "", /text\/html/);
			const html = await response.text();
			assert.match(html, /CleanOps/, `${path}: unexpected website`);
			assert.match(html, /<h1[\s>]/, `${path}: missing prerendered content`);
			const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0];
			assert.ok(canonical?.includes(`href="${canonicalOrigin}${path === "/" ? "" : path}"`) || canonical?.includes(`href="${canonicalOrigin}${path}"`), `${path}: missing canonical URL`);
		}
		const xero = await check("/brands/xero.svg");
		assert.match(xero.headers.get("content-type") ?? "", /image\/svg\+xml/);
		await check("/sitemap.xml");
		await check("/robots.txt");
		console.log(`All ${pages.length} pages and public assets passed at ${origin}`);
		process.exit(0);
	} catch (error) {
		console.error(`Attempt ${attempt}: ${error.message}`);
		if (attempt === 6) process.exit(1);
		await setTimeout(10_000);
	}
}
