// Writes src/content/plans.json from the backend's launch catalogue (cleanops/app/services/subscriptions/plans.py), so
// the prices and features on the site are the ones the product charges. Never type a price into a page.
//   node scripts/sync-plans.mjs            write the file
//   node scripts/sync-plans.mjs --check    fail when the file differs from the backend (CI)
// The backend checkout defaults to ../cleanops; set CLEANOPS_API_DIR to point elsewhere.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";

const backend = resolve(process.env.CLEANOPS_API_DIR ?? new URL("../../cleanops", import.meta.url).pathname);
const target = new URL("../src/content/plans.json", import.meta.url).pathname;

const program = `
import json
from app.services.subscriptions.plans import LAUNCH_PLANS, TRIAL_PLAN
plans = [
    {
        "code": p.code.value,
        "name": p.name,
        "monthly": str(p.base_price_monthly_nzd),
        "annual": str(p.base_price_annual_nzd),
        "seats": p.included_field_seats,
        "extraSeat": str(p.extra_seat_price_nzd),
        "storageGb": p.included_storage_gb,
        "features": sorted(f.value for f in p.features),
    }
    for p in LAUNCH_PLANS
]
print(json.dumps({"trialPlan": TRIAL_PLAN.value, "storageOveragePerGb": "1.00", "currency": "NZD", "pricesExcludeGst": True, "plans": plans}, indent=2))
`;

const json = `${execFileSync("uv", ["run", "--quiet", "python", "-c", program], { cwd: backend, encoding: "utf8" }).trim()}\n`;

if (process.argv.includes("--check")) {
	const current = readFileSync(target, "utf8");
	if (!isDeepStrictEqual(JSON.parse(current), JSON.parse(json))) {
		console.error("src/content/plans.json is out of date with the backend catalogue; run node scripts/sync-plans.mjs");
		process.exit(1);
	}
	console.log("plans.json matches the backend catalogue");
} else {
	writeFileSync(target, json);
	console.log(`wrote ${target}`);
}
