import type { SVGProps } from "react";

// Official full-colour artwork, preserved from Xero's website.
// Source: https://www.xero.com/content/dam/xero/pilot-images/admin/icons/favicon/favicon.svg
// Decorative: the adjacent copy already names Xero.
export function XeroLogo({ className = "" }: SVGProps<SVGSVGElement>) {
	return (
		<img
			src="/brands/xero.svg"
			alt=""
			aria-hidden="true"
			width={32}
			height={32}
			className={`xero-logo ${className}`}
		/>
	);
}
