import { getCatalogRows } from "@/scripts/catalog/store.js"
import { shipments } from "@/scripts/data/shipment-store.js"
import { $ } from "@/scripts/utils/dom.js"
import { buildOperationsTable } from "@/scripts/tables/model.js"

export function initializeOperationsTable(view) {
	let filter = "Todos",
		query = ""
	function render() {
		$(".nav-count").textContent = shipments.length
		document
			.querySelectorAll("[data-filter]")
			.forEach((b) =>
				b.classList.toggle("selected", b.dataset.filter === filter),
			)
		const { heads, rows, total, title } = buildOperationsTable(
			view,
			shipments,
			{ filter, query, catalogRows: getCatalogRows(view) },
		)
		$("#table-title").innerHTML = `${title} <span class="count">${total}</span>`
		$("#table-subtitle").textContent = ["overview", "shipments"].includes(view)
			? "Cada carga, bajo control."
			: "Información de referencia de tu operación."
		$("#table-head").innerHTML =
			`<tr>${heads.map((h) => `<th scope="col">${h}</th>`).join("")}</tr>`
		$("#table-body").innerHTML = rows.length
			? rows.join("")
			: `<tr><td colspan="${heads.length}" class="empty">No encontramos resultados. Prueba otra búsqueda.</td></tr>`
		$("#results-label").textContent =
			`${total} ${["overview", "shipments"].includes(view) ? "envíos" : "registros"}`
	}

	document.querySelectorAll("[data-filter]").forEach((button) =>
		button.addEventListener("click", () => {
			filter = button.dataset.filter
			render()
		}),
	)
	$("#search").addEventListener("input", (event) => {
		query = event.target.value.toLowerCase().trim()
		render()
	})
	$(".tabs").hidden = !["overview", "shipments"].includes(view)
	$("#search").placeholder = ["overview", "shipments"].includes(view)
		? "Buscar envío…"
		: "Buscar…"
	return render
}
