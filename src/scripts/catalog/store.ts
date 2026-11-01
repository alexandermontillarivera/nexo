import { isCatalogView } from "@/types/logistics"
import type { View, CatalogView, CatalogRow } from "@/types/logistics"
const key = "nexo-catalogs"
const catalogs: Record<CatalogView, CatalogRow[]> = {
	fleet: [],
	drivers: [],
	routes: [],
	goods: [],
}
function isCatalogRow(value: unknown): value is CatalogRow {
	return (
		Array.isArray(value) &&
		value.length === 4 &&
		value.every((cell) => typeof cell === "string")
	)
}
try {
	const saved: unknown = JSON.parse(localStorage.getItem(key) || "null")
	if (saved && typeof saved === "object") {
		for (const view of Object.keys(saved)) {
			if (!isCatalogView(view)) continue
			const rows: unknown = (saved as Record<string, unknown>)[view]
			if (Array.isArray(rows)) catalogs[view] = rows.filter(isCatalogRow)
		}
	}
} catch {}
export function getCatalogRows(view: View): CatalogRow[] {
	return isCatalogView(view) ? catalogs[view] : []
}
export function addCatalogRow(view: CatalogView, row: CatalogRow): boolean {
	catalogs[view].push(row)
	try {
		localStorage.setItem(key, JSON.stringify(catalogs))
		return true
	} catch {
		return false
	}
}
