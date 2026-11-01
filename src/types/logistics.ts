export type CatalogView = "fleet" | "drivers" | "routes" | "goods"
export type View = "overview" | "shipments" | CatalogView
export type ShipmentStatus = "Programado" | "En tránsito" | "Entregado"
export interface Shipment {
	id: string
	client: string
	origin: string
	destination: string
	goods: string
	weight: number
	driver: number
	status: ShipmentStatus
	departure: string
	arrival: string
}
export type CatalogRow = [string, string, string, string]
export type Refresh = () => void
export interface CatalogField {
	name: string
	label: string
	type?: "text" | "number"
	placeholder?: string
	min?: number
	max?: number
	maxLength?: number
	optional?: boolean
	options?: string[]
}
export interface CatalogAction {
	label: string
	title: string
	description: string
	success: string
	fields: CatalogField[]
}
export interface TableOptions {
	filter?: string
	query?: string
	catalogRows?: CatalogRow[]
}
export interface OperationsTable {
	heads: string[]
	rows: string[]
	total: number
	title: string
	isShipments: boolean
}
export function isCatalogView(value: unknown): value is CatalogView {
	return (
		value === "fleet" ||
		value === "drivers" ||
		value === "routes" ||
		value === "goods"
	)
}
export function isView(value: unknown): value is View {
	return value === "overview" || value === "shipments" || isCatalogView(value)
}
