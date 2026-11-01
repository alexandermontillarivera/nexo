import { $ } from "@/scripts/utils/dom.js"

export function initializeMobileNavigation(signal) {
	const drawer = $("#mobile-menu")
	const trigger = $("#open-mobile-menu")
	const close = () => {
		if (drawer.open) drawer.close()
	}
	trigger.addEventListener("click", () => {
		drawer.showModal()
		trigger.setAttribute("aria-expanded", "true")
	})
	$("#close-mobile-menu").addEventListener("click", close)
	drawer.addEventListener("close", () =>
		trigger.setAttribute("aria-expanded", "false"),
	)
	drawer
		.querySelectorAll("a")
		.forEach((link) => link.addEventListener("click", close))
	matchMedia("(min-width: 901px)").addEventListener(
		"change",
		(event) => {
			if (event.matches) close()
		},
		{ signal },
	)
}
