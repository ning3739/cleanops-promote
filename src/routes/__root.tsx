import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteFooter } from "#/components/site-footer";
import { SiteHeader } from "#/components/site-header";
import { THEME_SCRIPT } from "#/components/theme-toggle";
import { organizationJsonLd } from "#/content/seo";
import { site } from "#/site";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "theme-color", content: "#006d87" },
			{ property: "og:site_name", content: site.name },
			{ property: "og:locale", content: "en_NZ" },
			{ property: "og:type", content: "website" },
			{ property: "og:image", content: `${site.origin}/og.png` },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(organizationJsonLd),
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en-NZ" suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed string, applies the saved theme before paint */}
				<script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
				<HeadContent />
			</head>
			<body>
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2"
				>
					Skip to content
				</a>
				<SiteHeader />
				<main id="main">{children}</main>
				<SiteFooter />
				<Scripts />
			</body>
		</html>
	);
}
