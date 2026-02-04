import { onScopeDispose, type ShallowRef, watch } from 'vue'

export const useResizeObserver = (
	elementRef: ShallowRef<Element | null, Element | null>,
	callback: ResizeObserverCallback,
) => {
	const observer = new ResizeObserver(callback)

	watch(
		elementRef,
		(element, oldElement) => {
			if (oldElement) observer.unobserve(oldElement)
			if (element) observer.observe(element)
		},
		{ flush: 'post' },
	)

	onScopeDispose(() => observer.disconnect())
}
