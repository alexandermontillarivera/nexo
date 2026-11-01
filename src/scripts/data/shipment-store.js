import { drivers, seed } from "@/scripts/data/demo.js"
export let shipments
try {
	const saved = JSON.parse(localStorage.getItem("nexo-shipments"))
	shipments =
		Array.isArray(saved) &&
		saved.every(
			(s) =>
				s.id &&
				s.client &&
				s.departure &&
				s.arrival &&
				drivers[s.driver] &&
				["Programado", "En tránsito", "Entregado"].includes(s.status),
		)
			? saved
			: seed
} catch {
	shipments = seed
}

export function persist() {
	try {
		localStorage.setItem("nexo-shipments", JSON.stringify(shipments))
		return true
	} catch {
		return false
	}
}
