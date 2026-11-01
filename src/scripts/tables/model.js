import { badge, time, date, route } from "@/scripts/utils/format.js"
import { escapeHTML } from "@/scripts/utils/dom.js"
import { drivers } from "@/scripts/data/demo.js"

export function buildOperationsTable(
	view,
	shipments,
	{ filter = "Todos", query = "", catalogRows = [] } = {},
) {
	let heads, rows, total
	if (["overview", "shipments"].includes(view)) {
		const data = shipments.filter(
			(s) =>
				(filter === "Todos" || s.status === filter) &&
				[s.id, s.client, s.origin, s.destination, drivers[s.driver]]
					.join(" ")
					.toLowerCase()
					.includes(query),
		)
		heads = [
			"Envío / Cliente",
			"Ruta",
			"Chofer",
			"Estado",
			"Llegada estimada",
			"",
		]
		total = data.length
		rows = data.map(
			(s) =>
				`<tr><td><strong>${escapeHTML(s.id)}</strong><small>${escapeHTML(s.client)}</small></td><td>${route(s)}</td><td>${escapeHTML(drivers[s.driver])}<small>Camión NX-00${s.driver + 1}</small></td><td>${badge(s.status)}</td><td>${time(s.arrival)}<small>${date(s.arrival)}</small></td><td><button class="row-button" data-detail="${escapeHTML(s.id)}" aria-label="Ver detalle de ${escapeHTML(s.id)}">↗</button></td></tr>`,
		)
	} else {
		let data = []
		if (view === "fleet") {
			heads = ["Unidad", "Modelo", "Capacidad", "Estado"]
			data = Array.from({ length: 8 }, (_, i) => {
				const ongoing = shipments.find(
					(s) => s.driver === i && s.status === "En tránsito",
				)
				return [
					`NX-00${i + 1}`,
					["Freightliner Cascadia", "Volvo FH", "International LT"][i % 3],
					i % 2 ? "12,000 kg" : "20,000 kg",
					ongoing
						? badge("En tránsito")
						: '<span class="badge delivered">Disponible</span>',
				]
			})
		}
		if (view === "drivers") {
			heads = ["Chofer", "Licencia", "Unidad asignada", "Estado"]
			data = drivers.map((name, i) => [
				name,
				`Categoría 4 · LIC-00${i + 1}`,
				`NX-00${i + 1}`,
				shipments.some((s) => s.driver === i && s.status === "En tránsito")
					? badge("En tránsito")
					: '<span class="badge delivered">Disponible</span>',
			])
		}
		if (view === "routes") {
			heads = ["Origen", "Destino", "Distancia estimada", "Tiempo estimado"]
			data = [
				["Santo Domingo", "Santiago", "155 km", "2 h 30 min"],
				["Santo Domingo", "Punta Cana", "196 km", "3 h"],
				["Santiago", "La Vega", "37 km", "45 min"],
				["La Vega", "Santo Domingo", "127 km", "2 h"],
			]
		}
		if (view === "goods") {
			heads = ["Mercancía", "Código", "Tipo de carga", "Manipulación"]
			data = [
				["Productos de consumo", "MC-001", "Carga general", "Estándar"],
				[
					"Materiales de construcción",
					"MC-002",
					"Carga pesada",
					"Equipo de descarga",
				],
				[
					"Equipos electrónicos",
					"MC-003",
					"Carga frágil",
					"Manipular con cuidado",
				],
				[
					"Alimentos refrigerados",
					"MC-004",
					"Cadena de frío",
					"Temperatura controlada",
				],
			]
		}
		data = [...data, ...catalogRows]
		data = data.filter((r) => r.join(" ").toLowerCase().includes(query))
		total = data.length
		rows = data.map(
			(r) =>
				`<tr>${r.map((v, i) => `<td>${i === 3 && !catalogRows.includes(r) && v.startsWith("<span") ? v : i === 0 ? `<strong>${escapeHTML(v)}</strong>` : escapeHTML(v)}</td>`).join("")}</tr>`,
		)
	}
	const labels = {
		overview: "Envíos recientes",
		shipments: "Todos los envíos",
		fleet: "Flota de camiones",
		drivers: "Equipo de choferes",
		routes: "Rutas disponibles",
		goods: "Catálogo de mercancías",
	}

	return {
		heads,
		rows,
		total,
		title: labels[view],
		isShipments: ["overview", "shipments"].includes(view),
	}
}
