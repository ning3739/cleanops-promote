import { site } from "#/site";

export function LegalPage({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<article className="legal-page mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-20">
			<h1 className="text-[36px] leading-tight font-medium tracking-[-0.02em] text-ink">
				{title}
			</h1>
			<p className="mt-3 text-[15px] text-ink-muted">
				Last updated {site.legalUpdated}
			</p>
			{!site.legalReviewed && (
				<p className="mt-6 rounded-md border border-warn-line bg-warn-surface px-4 py-3 text-[15px] text-warn">
					Draft. This page is being reviewed and may change before CleanOps
					launches.
				</p>
			)}
			<div className="legal mt-10 space-y-5 text-[16px] leading-[1.8] text-ink [&_h2]:mt-10 [&_h2]:text-[20px] [&_h2]:font-medium [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
				{children}
			</div>
		</article>
	);
}
