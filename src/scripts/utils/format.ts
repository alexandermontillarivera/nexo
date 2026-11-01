import type { ShipmentStatus, Shipment } from "@/types/logistics"
import { escapeHTML } from "@/scripts/utils/dom.ts"
export const badge = (s: ShipmentStatus) =>
	`<span class="badge ${s === "En tránsito" ? "transit" : s === "Entregado" ? "delivered" : "scheduled"}">${escapeHTML(s)}</span>`
export const time = (s: string) =>
	new Date(s).toLocaleTimeString("es-DO", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	})
export const date = (s: string) =>
	new Date(s).toLocaleDateString("es-DO", { day: "2-digit", month: "short" })
export const route = (s: Pick<Shipment, "origin" | "destination">) =>
	`${escapeHTML(s.origin)}<span class="route-arrow">→</span>${escapeHTML(s.destination)}`
