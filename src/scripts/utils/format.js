import { escapeHTML } from "@/scripts/utils/dom.js"
export const badge = (s) =>
	`<span class="badge ${s === "En tránsito" ? "transit" : s === "Entregado" ? "delivered" : "scheduled"}">${escapeHTML(s)}</span>`
export const time = (s) =>
	new Date(s).toLocaleTimeString("es-DO", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	})
export const date = (s) =>
	new Date(s).toLocaleDateString("es-DO", { day: "2-digit", month: "short" })
export const route = (s) =>
	`${escapeHTML(s.origin)}<span class="route-arrow">→</span>${escapeHTML(s.destination)}`
