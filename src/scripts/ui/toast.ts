import { $ } from "@/scripts/utils/dom.ts"
let toastTimer: ReturnType<typeof setTimeout> | undefined
export function toast(message: string) {
	$("#toast").textContent = message
	$("#toast").classList.add("visible")
	clearTimeout(toastTimer)
	toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 3500)
}
