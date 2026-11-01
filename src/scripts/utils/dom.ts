export function $<T extends HTMLElement = HTMLElement>(selector: string): T {
	const element = document.querySelector<T>(selector)
	if (!element)
		throw new Error(`No se encontró el elemento requerido: ${selector}`)
	return element
}
const entities: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
}
export const escapeHTML = (value: unknown): string =>
	String(value).replace(/[&<>"']/g, (char) => entities[char])
export function formValues(form: HTMLFormElement): Record<string, string> {
	const result: Record<string, string> = {}
	for (const [key, value] of new FormData(form))
		if (typeof value === "string") result[key] = value.trim()
	return result
}
