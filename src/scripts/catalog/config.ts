import type { CatalogView, CatalogAction } from "@/types/logistics"
export const catalogActions: Record<CatalogView, CatalogAction> = {
	fleet: {
		label: "Nuevo camión",
		title: "Registrar camión",
		description: "Añade una unidad a tu flota.",
		success: "Camión registrado correctamente.",
		fields: [
			{
				name: "unit",
				label: "Código de unidad",
				placeholder: "NX-009",
				maxLength: 20,
			},
			{
				name: "model",
				label: "Modelo",
				placeholder: "Volvo FH",
				maxLength: 60,
			},
			{
				name: "capacity",
				label: "Capacidad (kg)",
				type: "number",
				min: 1,
				max: 50000,
				placeholder: "12000",
			},
		],
	},
	drivers: {
		label: "Nuevo chofer",
		title: "Registrar chofer",
		description: "Añade una persona a tu equipo.",
		success: "Chofer registrado correctamente.",
		fields: [
			{
				name: "name",
				label: "Nombre completo",
				placeholder: "Nombre y apellidos",
				maxLength: 80,
			},
			{
				name: "license",
				label: "Número de licencia",
				placeholder: "LIC-006",
				maxLength: 40,
			},
			{
				name: "unit",
				label: "Unidad asignada",
				placeholder: "NX-006",
				optional: true,
				maxLength: 20,
			},
		],
	},
	routes: {
		label: "Nueva ruta",
		title: "Crear ruta",
		description: "Conecta un nuevo origen y destino.",
		success: "Ruta creada correctamente.",
		fields: [
			{
				name: "origin",
				label: "Origen",
				placeholder: "Santo Domingo",
				maxLength: 60,
			},
			{
				name: "destination",
				label: "Destino",
				placeholder: "Santiago",
				maxLength: 60,
			},
			{
				name: "distance",
				label: "Distancia estimada (km)",
				type: "number",
				min: 1,
				max: 10000,
			},
			{
				name: "duration",
				label: "Duración estimada (minutos)",
				type: "number",
				min: 1,
				max: 10080,
			},
		],
	},
	goods: {
		label: "Nueva mercancía",
		title: "Registrar mercancía",
		description: "Organiza los artículos que transporta tu empresa.",
		success: "Mercancía registrada correctamente.",
		fields: [
			{
				name: "name",
				label: "Nombre de la mercancía",
				placeholder: "Productos textiles",
				maxLength: 80,
			},
			{
				name: "type",
				label: "Tipo de carga",
				options: [
					"Carga general",
					"Carga pesada",
					"Carga frágil",
					"Cadena de frío",
				],
			},
			{
				name: "handling",
				label: "Manipulación",
				placeholder: "Estándar",
				maxLength: 100,
			},
		],
	},
}
