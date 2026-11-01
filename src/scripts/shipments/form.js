import { navigate } from "astro:transitions/client"
import { shipments } from "@/scripts/data/shipment-store.js"
import { persist } from "@/scripts/data/shipment-store.js"
import { toast } from "@/scripts/ui/toast.js"
import { $ } from "@/scripts/utils/dom.js"

export function initializeShipmentForm({ view, onChange }) {
	const trigger = $("#new-shipment")
	if (!trigger) return
	trigger.onclick = () => {
		const form = $("#shipment-form")
		form.reset()
		$("#form-error").textContent = ""
		const localInput = (d) => {
			const x = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
			return x.toISOString().slice(0, 16)
		}
		const now = new Date()
		form.elements.departure.value = localInput(
			new Date(now.getTime() + 3600000),
		)
		form.elements.arrival.value = localInput(new Date(now.getTime() + 14400000))
		$("#shipment-dialog").showModal()
	}
	$("#shipment-form").onsubmit = (e) => {
		e.preventDefault()
		const values = Object.fromEntries(new FormData(e.target))
		const error = $("#form-error")
		if (!values.client.trim()) {
			error.textContent = "Escribe el nombre del cliente."
			return
		}
		if (values.origin === values.destination) {
			error.textContent = "El origen y el destino deben ser diferentes."
			return
		}
		if (new Date(values.arrival) <= new Date(values.departure)) {
			error.textContent = "La llegada debe ser posterior a la salida."
			return
		}
		if (new Date(values.departure) < new Date()) {
			error.textContent = "Selecciona una salida futura."
			return
		}
		const driver = Number(values.driver)
		if (
			shipments.some(
				(s) =>
					s.driver === driver &&
					s.status !== "Entregado" &&
					new Date(values.departure) < new Date(s.arrival) &&
					new Date(values.arrival) > new Date(s.departure),
			)
		) {
			error.textContent =
				"Este chofer tiene otro envío en ese horario. Elige otro chofer u horario."
			return
		}
		const id = `NX-${Math.max(1048, ...shipments.map((s) => Number(s.id.split("-")[1]) || 0)) + 1}`
		shipments.unshift({
			...values,
			client: values.client.trim(),
			driver,
			weight: Number(values.weight),
			id,
			status: "Programado",
		})
		const saved = persist()
		if (!saved)
			toast(
				"Cambio guardado solo durante esta sesión. El almacenamiento no está disponible.",
			)
		$("#shipment-dialog").close()
		if (view === "overview" || view === "shipments") {
			onChange()
		} else {
			navigate("/envios")
		}
		if (saved) toast(`Envío ${id} programado correctamente.`)
	}
}
