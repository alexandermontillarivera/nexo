import { drivers, seed } from "@/scripts/data/demo.ts"
import type { Shipment } from "@/types/logistics"
function isShipment(value: unknown): value is Shipment {
	if (typeof value !== "object" || value === null) return false
	const row = value as Record<string, unknown>
	return (
		[
			"id",
			"client",
			"origin",
			"destination",
			"goods",
			"departure",
			"arrival",
		].every((key) => typeof row[key] === "string" && row[key] !== "") &&
		typeof row.weight === "number" &&
		Number.isFinite(row.weight) &&
		row.weight > 0 &&
		typeof row.driver === "number" &&
		Number.isInteger(row.driver) &&
		Boolean(drivers[row.driver]) &&
		["Programado", "En tránsito", "Entregado"].includes(String(row.status)) &&
		Number.isFinite(Date.parse(String(row.departure))) &&
		Number.isFinite(Date.parse(String(row.arrival)))
	)
}
export let shipments: Shipment[] = structuredClone(seed)
try {
	const saved: unknown = JSON.parse(
		localStorage.getItem("nexo-shipments") || "null",
	)
	if (Array.isArray(saved) && saved.every(isShipment)) shipments = saved
} catch {}
export function persist(): boolean {
	try {
		localStorage.setItem("nexo-shipments", JSON.stringify(shipments))
		return true
	} catch {
		return false
	}
}
