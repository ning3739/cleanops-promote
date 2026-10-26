import { Monitor, Moon, Sun } from "lucide-react";

// Light, dark or follow the system. tokens.css already switches on prefers-color-scheme; an explicit choice sets
// data-theme on <html>, which tokens.css honours over the system setting. The choice is a per-viewer convenience,
// kept in localStorage; THEME_SCRIPT applies it before first paint so the page never flashes the wrong theme.
type Theme = "system" | "light" | "dark";
const KEY = "cleanops-theme";
const order: Theme[] = ["system", "light", "dark"];
const labels: Record<Theme, string> = {
	system: "System theme",
	light: "Light theme",
	dark: "Dark theme",
};
const icons = { system: Monitor, light: Sun, dark: Moon };

export const THEME_SCRIPT = `try{var t=localStorage.getItem("${KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

function apply(theme: Theme) {
	const root = document.documentElement;
	if (theme === "system") delete root.dataset.theme;
	else root.dataset.theme = theme;
	try {
		if (theme === "system") localStorage.removeItem(KEY);
		else localStorage.setItem(KEY, theme);
	} catch {
		// Storage can be blocked; the choice then lasts for this page only.
	}
}

export function ThemeToggle() {
	return (
		<div className="theme-toggle relative size-11 shrink-0 sm:size-10">
			{/* CSS reads the theme applied before paint, including before hydration.
			    Only the current control is displayed or exposed to keyboard users. */}
			{order.map((theme, index) => {
				const next = order[(index + 1) % order.length];
				const Icon = icons[theme];
				return (
					<button
						key={theme}
						type="button"
						data-theme-option={theme}
						onClick={(event) => {
							const controls = event.currentTarget.parentElement;
							apply(next);
							controls
								?.querySelector<HTMLButtonElement>(
									`[data-theme-option="${next}"]`,
								)
								?.focus({ preventScroll: true });
						}}
						aria-label={`${labels[theme]}. Switch to ${labels[next].toLowerCase()}`}
						title={labels[theme]}
						className="theme-toggle-control absolute inset-0 size-full cursor-pointer items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken hover:text-ink"
					>
						<Icon className="size-[18px]" aria-hidden="true" />
					</button>
				);
			})}
		</div>
	);
}
