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
const start = await page.evaluate(() => window.START ?? 0);
const total = Math.round(((await page.evaluate(() => window.DURATION)) - start) * fps);
for (let i = 0; i < total; i++) {
	await page.evaluate((t) => window.seek(t), start + i / fps);
	await page.screenshot({ path: join(frames, `f${String(i).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 });
}
await browser.close();

// The track's beat drops 17 s in. The film starts at story time START (3.4 s), so starting the track 4.8 s in lands the
// drop on the cut to the on-site scene (story 15.6 s). The soundtrack is mixed once, then each encode reuses it.
const seconds = total / fps;
const media = `${here}../../public/media`;
const audio = join(tmpdir(), "cleanops-film-audio.wav");
execFileSync("ffmpeg", [
	"-y", "-loglevel", "error", "-ss", "4.8", "-t", String(seconds), "-i", music,
	"-af", `afade=t=in:st=0:d=0.6,afade=t=out:st=${(seconds - 2.8).toFixed(2)}:d=2.8,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000`,
	audio,
]);
const input = ["-y", "-loglevel", "error", "-framerate", String(fps), "-i", join(frames, "f%05d.jpg"), "-i", audio, "-map", "0:v", "-map", "1:a"];
// 1080p for wide screens, 720p for phones (the page picks by width); each as H.264 MP4 (plays everywhere) and AV1 WebM
// (about half the size, used where the browser supports it).
for (const [suffix, height] of [["", 1080], ["-720", 720]]) {
	const scale = ["-vf", `scale=-2:${height}:flags=lanczos`];
	execFileSync("ffmpeg", [
		...input, ...scale, "-c:v", "libx264", "-preset", "slow", "-crf", height === 1080 ? "24" : "26", "-pix_fmt", "yuv420p",
		"-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", `${media}/how-it-works${suffix}.mp4`,
	]);
	execFileSync("ffmpeg", [
		...input, ...scale, "-c:v", "libsvtav1", "-preset", "6", "-crf", height === 1080 ? "38" : "40", "-pix_fmt", "yuv420p",
		"-c:a", "libopus", "-b:a", "96k", "-shortest", `${media}/how-it-works${suffix}.webm`,
	]);
}
console.log(`wrote ${media}/how-it-works{,-720}.{mp4,webm} (${seconds.toFixed(1)} s)`);
