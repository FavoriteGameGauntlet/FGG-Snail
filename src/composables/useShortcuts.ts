import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export function useShortcuts() {
	const router = useRouter()

	const shortcuts: Record<string, () => void | undefined> = {
		'ctrl+shift+r': () => window.location.reload(),
		'ctrl+r': () => window.location.reload(),
		'alt+arrowright': () => router.forward(),
		'alt+arrowleft': () => router.back(),
	}

	const handleKeydown = (event: KeyboardEvent) => {
		const key = [
			event.ctrlKey && 'ctrl',
			event.shiftKey && 'shift',
			event.altKey && 'alt',
			event.metaKey && 'meta',
			event.code.replace(/^Key(?=[A-Z])/, '').toLowerCase(),
		]
			.filter(Boolean)
			.join('+')

		shortcuts[key]?.()
	}

	onMounted(() => window.addEventListener('keydown', handleKeydown))
	onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
}
