const key = "nexo-catalogs"
const views = ["fleet", "drivers", "routes", "goods"]
let catalogs = Object.fromEntries(views.map((view) => [view, []]))
try {
	const saved = JSON.parse(localStorage.getItem(key))
	if (saved && typeof saved === "object") {
		for (const view of views)
			if (Array.isArray(saved[view]))
				catalogs[view] = saved[view].filter(
					(row) =>
						Array.isArray(row) &&
						row.length === 4 &&
						row.every((value) => typeof value === "string"),
				)
	}
} catch {}
export function getCatalogRows(view) {
	return catalogs[view] || []
}
export function addCatalogRow(view, row) {
	catalogs[view].push(row)
	try {
		localStorage.setItem(key, JSON.stringify(catalogs))
		return true
	} catch {
		return false
	}
}
