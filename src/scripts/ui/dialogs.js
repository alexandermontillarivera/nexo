import { $ } from "@/scripts/utils/dom.js"
export function initializeDialogs() {
	document
		.querySelectorAll(".close-dialog")
		.forEach((b) => (b.onclick = () => $("#shipment-dialog").close()))
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
