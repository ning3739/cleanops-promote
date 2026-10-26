// Renders scripts/film/story.html to public/media/how-it-works.mp4: every frame is a screenshot at a fixed time, so the
// film is sharp and smooth regardless of machine speed. Needs Playwright (from cleanops-web) and ffmpeg.
//   node scripts/film/render.mjs path/to/music.mp3
// story.html reads full-resolution captures from scripts/film/a/ (2880×1800 desktop, 1206×2622 phone); they are not in
// git. Capture them as the README describes, at device scale 2 / from the simulator.
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

const here = new URL(".", import.meta.url).pathname;
const music = process.argv[2];
if (!music) throw new Error("Pass the music file: node scripts/film/render.mjs music.mp3");
const require = createRequire(join(process.env.PLAYWRIGHT_FROM ?? `${here}../../../cleanops-web`, "package.json"));
const { chromium } = require("playwright");

const frames = join(tmpdir(), "cleanops-film-frames");
rmSync(frames, { recursive: true, force: true });
mkdirSync(frames, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(`file://${here}story.html`);
await page.evaluate(() => window.ready);
const fps = 30;
const total = Math.round((await page.evaluate(() => window.DURATION)) * fps);
for (let i = 0; i < total; i++) {
	await page.evaluate((t) => window.seek(t), i / fps);
	await page.screenshot({ path: join(frames, `f${String(i).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 });
}
await browser.close();

// The track's beat drops 1 s + 16 s in; starting it 1 s in lands the drop on the cut to the on-site scene.
const out = `${here}../../public/media/how-it-works.mp4`;
execFileSync("ffmpeg", [
	"-y", "-loglevel", "error", "-framerate", String(fps), "-i", join(frames, "f%05d.jpg"),
	"-ss", "1.0", "-t", String(total / fps), "-i", music,
	"-filter_complex", "[1:a]afade=t=in:st=0:d=0.6,afade=t=out:st=47.2:d=2.8,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000[a]",
	"-map", "0:v", "-map", "[a]", "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-pix_fmt", "yuv420p",
	"-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out,
]);
console.log(`wrote ${out}`);
