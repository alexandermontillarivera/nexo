import { $, escapeHTML } from "@/scripts/utils/dom.js"
import { badge, time, date, route } from "@/scripts/utils/format.js"
import { drivers } from "@/scripts/data/demo.js"
import { shipments } from "@/scripts/data/shipment-store.js"
import { persist } from "@/scripts/data/shipment-store.js"
import { toast } from "@/scripts/ui/toast.js"
export function initializeShipmentDetail(onChange, signal) {
	function showDetail(id) {
		const s = shipments.find((s) => s.id === id)
		if (!s) return
		const stages = ["Programado", "En tránsito", "Entregado"]
		const current = stages.indexOf(s.status)
		$("#detail-content").innerHTML =
			`<div class="dialog-heading"><div><span class="eyebrow">DETALLE DEL ENVÍO</span><h2>${escapeHTML(s.id)}</h2></div><button class="icon-button" data-close-detail aria-label="Cerrar">✕</button></div><p class="dialog-intro">${escapeHTML(s.client)}</p>${badge(s.status)}<div class="detail-grid"><div><small>Origen → Destino</small><strong>${route(s)}</strong></div><div><small>Mercancía</small><strong>${escapeHTML(s.goods)}</strong></div><div><small>Chofer / Unidad</small><strong>${escapeHTML(drivers[s.driver])} · NX-00${s.driver + 1}</strong></div><div><small>Peso</small><strong>${Number(s.weight).toLocaleString("es-DO")} kg</strong></div><div><small>Salida</small><strong>${date(s.departure)} · ${time(s.departure)}</strong></div><div><small>Llegada estimada</small><strong>${date(s.arrival)} · ${time(s.arrival)}</strong></div></div><h2>Seguimiento del envío</h2><div class="timeline">${stages.map((stage, i) => `<p class="${i <= current ? "done" : ""}">${stage}<small>${i <= current ? "Estado registrado" : "Pendiente"}</small></p>`).join("")}</div><div class="dialog-actions">${current < 2 ? `<button class="primary" data-advance="${escapeHTML(s.id)}">${current === 0 ? "Iniciar viaje" : "Marcar como entregado"} ↗</button>` : '<span class="badge delivered">Entrega completada</span>'}</div>`
		if (!$("#detail-dialog").open) $("#detail-dialog").showModal()
	}
	document.addEventListener(
		"click",
		(e) => {
			const detail = e.target.closest("[data-detail]")
			if (detail) showDetail(detail.dataset.detail)
			if (e.target.closest("[data-close-detail]")) $("#detail-dialog").close()
			const advance = e.target.closest("[data-advance]")
			if (advance) {
				const s = shipments.find((s) => s.id === advance.dataset.advance)
				if (!s || s.status === "Entregado") return
				if (
					s.status === "Programado" &&
					shipments.some(
						(x) =>
							x !== s && x.driver === s.driver && x.status === "En tránsito",
					)
				) {
					toast("El chofer ya tiene un viaje en tránsito.")
					return
				}
				s.status = s.status === "Programado" ? "En tránsito" : "Entregado"
				const saved = persist()
				if (!saved)
					toast(
						"Cambio guardado solo durante esta sesión. El almacenamiento no está disponible.",
					)
				onChange()
				showDetail(s.id)
				if (saved)
					toast(
						s.status === "Entregado"
							? "Envío entregado. Un destino más, conectado."
							: "Viaje iniciado. Buen camino.",
					)
			}
		},
		{ signal },
	)
}
