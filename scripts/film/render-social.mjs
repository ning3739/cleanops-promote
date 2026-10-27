// Renders scripts/film/social.html as the Facebook / Instagram cuts: 9:16 (Reels, Stories) and 4:5 (feed posts), H.264
// MP4 at 30 fps with the same music as the site film. Needs Playwright (from cleanops-web) and ffmpeg.
//   node scripts/film/render-social.mjs path/to/music.mp3 [output directory, default ~/Desktop]
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";

const here = new URL(".", import.meta.url).pathname;
const [music, outDir = join(homedir(), "Desktop")] = process.argv.slice(2);
if (!music) throw new Error("Pass the music file: node scripts/film/render-social.mjs music.mp3 [output directory]");
const require = createRequire(join(process.env.PLAYWRIGHT_FROM ?? `${here}../../../cleanops-web`, "package.json"));
const { chromium } = require("playwright");
const fps = 30;
const browser = await chromium.launch();

for (const [format, name] of [["tall", "CleanOps-Instagram-Facebook-Reels-9x16.mp4"], ["feed", "CleanOps-Instagram-Facebook-Feed-4x5.mp4"]]) {
	const frames = join(tmpdir(), `cleanops-social-${format}`);
	rmSync(frames, { recursive: true, force: true });
	mkdirSync(frames, { recursive: true });
	const page = await browser.newPage({ viewport: { width: 1080, height: format === "tall" ? 1920 : 1350 } });
	await page.goto(`file://${here}social.html?format=${format}`);
	await page.evaluate(() => window.ready);
	const seconds = await page.evaluate(() => window.DURATION);
	for (let i = 0; i < seconds * fps; i++) {
		await page.evaluate((t) => window.seek(t), i / fps);
		await page.screenshot({ path: join(frames, `f${String(i).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 });
	}
	await page.close();
	// Social plays the track from its beat drop (17 s in): there is no slow intro to wait through on a feed.
	execFileSync("ffmpeg", [
		"-y", "-loglevel", "error", "-framerate", String(fps), "-i", join(frames, "f%05d.jpg"),
		"-ss", "17", "-t", String(seconds), "-i", music,
		"-filter_complex", `[1:a]afade=t=in:st=0:d=0.3,afade=t=out:st=${seconds - 2.5}:d=2.5,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]`,
		"-map", "0:v", "-map", "[a]", "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-profile:v", "high",
		"-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", join(outDir, name),
	]);
	console.log(`wrote ${join(outDir, name)}`);
}
await browser.close();
