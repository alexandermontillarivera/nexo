import { initializeCatalogForm } from "@/scripts/catalog/form.js"
import { $ } from "@/scripts/utils/dom.js"
import { shipments } from "@/scripts/data/shipment-store.js"
import { initializeIcons } from "@/scripts/ui/icons.js"
import { initializeMobileNavigation } from "@/scripts/ui/mobile-navigation.js"
import { initializeDialogs } from "@/scripts/ui/dialogs.js"
import { toast } from "@/scripts/ui/toast.js"
import { renderSummary } from "@/scripts/overview/summary.js"
import { initializeOperationsTable } from "@/scripts/tables/operations.js"
import { initializeShipmentDetail } from "@/scripts/shipments/detail.js"
import { initializeShipmentForm } from "@/scripts/shipments/form.js"

let pageController
function initializePage() {
	pageController?.abort()
	pageController = new AbortController()
	const view = document.body.dataset.view || "overview"
	const renderTable = initializeOperationsTable(view)
	function refresh() {
		renderTable()
		renderSummary()
	}
	initializeIcons()
	initializeDialogs()
	initializeMobileNavigation(pageController.signal)
	initializeShipmentDetail(refresh, pageController.signal)
	initializeShipmentForm({ view, onChange: refresh })
	initializeCatalogForm(view, refresh)
	$("#notifications").addEventListener("click", () =>
		toast(
			`${shipments.filter((s) => s.status === "Programado").length} envíos programados. No hay incidencias registradas.`,
		),
	)
	refresh()
}
// Refresh before paint so saved local data never flashes back to demo values.
document.addEventListener("astro:after-swap", initializePage)
if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", initializePage, { once: true })
else initializePage()
