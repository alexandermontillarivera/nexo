import { isView } from "@/types/logistics"
import { initializeCatalogForm } from "@/scripts/catalog/form.ts"
import { $ } from "@/scripts/utils/dom.ts"
import { shipments } from "@/scripts/data/shipment-store.ts"
import { initializeIcons } from "@/scripts/ui/icons.ts"
import { initializeMobileNavigation } from "@/scripts/ui/mobile-navigation.ts"
import { initializeDialogs } from "@/scripts/ui/dialogs.ts"
import { toast } from "@/scripts/ui/toast.ts"
import { renderSummary } from "@/scripts/overview/summary.ts"
import { initializeOperationsTable } from "@/scripts/tables/operations.ts"
import { initializeShipmentDetail } from "@/scripts/shipments/detail.ts"
import { initializeShipmentForm } from "@/scripts/shipments/form.ts"

let pageController: AbortController | undefined
function initializePage() {
	pageController?.abort()
	pageController = new AbortController()
	const candidateView = document.body.dataset.view
	const view = isView(candidateView) ? candidateView : "overview"
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
