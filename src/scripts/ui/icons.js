const icons = {
	menu: "M4 6h16 M4 12h16 M4 18h16",
	close: "m6 6 12 12 M18 6 6 18",
	grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
	box: "m3 7 9-5 9 5v10l-9 5-9-5z M3 7l9 5 9-5 M12 12v10 M7 4l9 5",
	truck:
		"M2 5h12v12H2z M14 9h4l4 5v3h-8 M5 17a2 2 0 1 0 0 .1 M18 17a2 2 0 1 0 0 .1",
	users:
		"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M17 4a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-4",
	route:
		"M5 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M19 23a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M5 7v5a4 4 0 0 0 4 4h6a4 4 0 0 0 0-8h-3",
	layers: "m12 2 10 5-10 5L2 7z M2 12l10 5 10-5 M2 17l10 5 10-5",
	bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4",
	plus: "M12 5v14 M5 12h14",
	check: "m5 12 4 4L19 6",
	clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20 M12 6v6l4 2",
	search: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16 M16 16l6 6",
}
export function initializeIcons() {
	document
		.querySelectorAll("[data-icon]")
		.forEach(
			(el) =>
				(el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[el.dataset.icon] || icons.box}"/></svg>`),
		)
}
