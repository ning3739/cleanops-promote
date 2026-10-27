import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { recording, screens } from "#/content/screens";

// The overview starts on request, with native controls for pause, seeking and sound.
export function DemoVideo() {
	const ref = useRef<HTMLVideoElement>(null);
	const [started, setStarted] = useState(false);

	const play = () => {
		const video = ref.current;
		if (!video) return;
		setStarted(true);
		video.controls = true;
		video.play().catch(() => {
			// Native controls remain available if playback is blocked or interrupted.
		});
	};

	return (
		<div className="demo-player">
			<video
				ref={ref}
				controls={started}
				playsInline
				preload="none"
				poster={screens.officeToday.src}
				aria-label="CleanOps product walkthrough"
				className="block aspect-video w-full bg-surface object-cover"
			>
				{/* Phones get 720p; browsers that play AV1 get the smaller WebM. The first match wins. */}
				{recording.sources.map((source) => (
					<source
						key={source.src}
						src={source.src}
						type={source.type}
						media={source.media}
					/>
				))}
				<track
					kind="captions"
					src="/media/how-it-works.en.vtt"
					srcLang="en"
					label="English"
				/>
				<a href={recording.src}>Download the product walkthrough</a>
			</video>
			{!started && (
				<button
					type="button"
					onClick={play}
					className="demo-play-button"
					aria-label={`Play the ${recording.seconds}-second CleanOps product walkthrough with sound`}
				>
					<span>
						<Play className="size-5" aria-hidden="true" />
						Watch the overview
						<span className="demo-duration">{recording.seconds}s</span>
					</span>
				</button>
			)}
		</div>
	);
}
