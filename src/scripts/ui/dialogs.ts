import { $ } from "@/scripts/utils/dom.ts"
export function initializeDialogs() {
	document
		.querySelectorAll<HTMLButtonElement>(".close-dialog")
		.forEach(
			(b) =>
				(b.onclick = () => $<HTMLDialogElement>("#shipment-dialog").close()),
		)
	document.querySelectorAll("dialog").forEach((d) =>
		d.addEventListener("click", (e) => {
			if (e.target === d) {
				const r = d.getBoundingClientRect()
				if (
					e.clientX < r.left ||
					e.clientX > r.right ||
					e.clientY < r.top ||
					e.clientY > r.bottom
				)
					d.close()
			}
		}),
	)
}
