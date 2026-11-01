import { $ } from "@/scripts/utils/dom.js"
import { catalogActions } from "@/scripts/catalog/config.js"
import { getCatalogRows, addCatalogRow } from "@/scripts/catalog/store.js"
import { toast } from "@/scripts/ui/toast.js"

export function initializeCatalogForm(view, onChange) {
	const action = catalogActions[view]
	if (!action) return
	const dialog = $("#catalog-dialog")
	const form = $("#catalog-form")
	$("#new-resource").addEventListener("click", () => {
		form.reset()
		$("#catalog-error").textContent = ""
		dialog.showModal()
	})
	dialog
		.querySelectorAll("[data-close-catalog]")
		.forEach((button) => button.addEventListener("click", () => dialog.close()))
	form.addEventListener("submit", (event) => {
		event.preventDefault()
		const data = Object.fromEntries(
			[...new FormData(form)].map(([key, value]) => [key, value.trim()]),
		)
		const fail = (message) => {
			$("#catalog-error").textContent = message
		}
		if (action.fields.some((field) => !field.optional && !data[field.name]))
			return fail("Completa todos los campos obligatorios.")
		const existing = getCatalogRows(view)
		let row
		if (view === "fleet") {
			data.unit = data.unit.toUpperCase()
			if (!/^NX-\d{3,}$/.test(data.unit))
				return fail("Usa un código de unidad como NX-009.")
			if (
				Number(data.unit.slice(3)) <= 8 ||
				existing.some((row) => row[0] === data.unit)
			)
				return fail("Ya existe un camión con ese código.")
			row = [
				data.unit,
				data.model,
				Number(data.capacity).toLocaleString("es-DO") + " kg",
				"Disponible",
			]
		}
		if (view === "drivers") {
			data.license = data.license.toUpperCase()
			if (
				/^LIC-00[1-5]$/.test(data.license) ||
				existing.some((row) => row[1].toUpperCase() === data.license)
			)
				return fail("Ya existe un chofer con esa licencia.")
			row = [
				data.name,
				data.license,
				data.unit.toUpperCase() || "Sin asignar",
				"Disponible",
			]
		}
		if (view === "routes") {
			if (data.origin.toLowerCase() === data.destination.toLowerCase())
				return fail("El origen y el destino deben ser diferentes.")
			if (
				existing.some(
					(row) =>
						row[0].toLowerCase() === data.origin.toLowerCase() &&
						row[1].toLowerCase() === data.destination.toLowerCase(),
				)
			)
				return fail("Esta ruta ya está registrada.")
			const minutes = Number(data.duration),
				hours = Math.floor(minutes / 60),
				rest = minutes % 60
			row = [
				data.origin,
				data.destination,
				data.distance + " km",
				[hours ? hours + " h" : "", rest ? rest + " min" : ""]
					.filter(Boolean)
					.join(" "),
			]
		}
		if (view === "goods")
			row = [
				data.name,
				`MC-${String(existing.length + 5).padStart(3, "0")}`,
				data.type,
				data.handling,
			]
		const saved = addCatalogRow(view, row)
		form.reset()
		dialog.close()
		onChange()
		toast(
			saved
				? action.success
				: "Registro añadido solo durante esta sesión. No se pudo guardar en el navegador.",
		)
	})
}
