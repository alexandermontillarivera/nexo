import { time, date, route } from "@/scripts/utils/format.ts"
import { shipments } from "@/scripts/data/shipment-store.ts"
import { $, escapeHTML } from "@/scripts/utils/dom.ts"
import { drivers } from "@/scripts/data/demo.ts"

export function renderSummary() {
	if (!document.querySelector("#overview")) return
	{
		$("#active-count").textContent = String(
			shipments.filter((s) => s.status !== "Entregado").length,
		)
		$("#delivered-count").textContent = String(
			shipments.filter((s) => s.status === "Entregado").length,
		)
		$(".nav-count").textContent = String(shipments.length)
		const departures = shipments
			.filter((s) => s.status === "Programado")
			.sort((a, b) => a.departure.localeCompare(b.departure))
			.slice(0, 3)
		$("#departures").innerHTML = departures.length
			? departures
					.map(
						(s) =>
							`<div class="departure"><div class="departure-time">${time(s.departure)}<small>${date(s.departure)}</small></div><div class="departure-route"><strong>${route(s)}</strong><small>${escapeHTML(s.id)} · ${escapeHTML(drivers[s.driver])}</small></div><button data-detail="${escapeHTML(s.id)}" aria-label="Ver envío ${escapeHTML(s.id)}">↗</button></div>`,
					)
					.join("")
			: '<p class="empty">No hay salidas pendientes.</p>'
	}
}
