import { useRouterState } from "@tanstack/react-router";
import { site } from "#/site";
import { ButtonLink } from "./button";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

// Links between pages are plain anchors: every page is prerendered HTML, so a full load needs no route chunk, and a
// tab left open across a deploy never asks for a chunk that no longer exists.
const nav = [
	{ href: "/product", path: "/product", label: "Product" },
	{ href: "/pricing", path: "/pricing", label: "Pricing" },
	{ href: "/app", path: "/app", label: "Field app" },
	{ href: "/help", path: "/help", label: "Help" },
] as const;

export function SiteHeader() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname.replace(/\/$/, ""),
	});
	return (
		<header className="site-header sticky top-0 z-40 border-b border-line bg-surface text-ink">
			<div className="marketing-container flex h-[76px] items-center gap-3 sm:gap-6">
				<a
					href="/"
					aria-label="CleanOps home"
					className="flex min-h-11 shrink-0 items-center no-underline"
				>
					<Logo />
				</a>
				<nav
					aria-label="Main"
					className="ml-8 hidden items-center gap-1 lg:flex"
				>
					{nav.map((item) => (
						<a
							key={item.label}
							href={item.href}
							aria-current={item.path === pathname ? "page" : undefined}
							className="rounded-md px-3 py-2 text-[15px] text-ink-muted no-underline hover:bg-surface-sunken hover:text-ink aria-[current=page]:text-ink"
						>
							{item.label}
						</a>
					))}
				</nav>
				<div className="ml-auto flex items-center gap-1 sm:gap-2">
					<ThemeToggle />
					<ButtonLink
						href={site.app.signIn}
						intent="ghost"
						className="max-sm:h-11 max-sm:px-3"
					>
						Sign in
					</ButtonLink>
					<ButtonLink
						href={site.app.register}
						data-cta="header"
						className="max-sm:h-11 max-sm:px-3.5"
					>
						Start free trial
					</ButtonLink>
				</div>
			</div>
			<nav
				aria-label="Main (mobile)"
				className="grid grid-cols-4 border-t border-line lg:hidden"
			>
				{nav.map((item) => (
					<a
						key={item.label}
						href={item.href}
						aria-current={item.path === pathname ? "page" : undefined}
						className="flex min-h-11 items-center justify-center text-[14px] text-ink-muted no-underline hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink"
					>
						{item.label}
					</a>
				))}
			</nav>
		</header>
	);
}
