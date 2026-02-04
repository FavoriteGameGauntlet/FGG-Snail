<script setup lang="ts">
import { storeToRefs } from 'pinia'
import rough from 'roughjs'
import { type RoughSVG } from 'roughjs/bin/svg'
import { ref, useTemplateRef, watch, watchEffect } from 'vue'
import type { FillStyle } from '../../enums/fillStyle'
import { useSettingsStore } from '../../stores/settingsStore'
import { useResizeObserver } from '../../composables/useResizeObserver'

type Props = {
	fillStyle?: FillStyle
	fillColor?: string
}

const { fillStyle = 'solid', fillColor = 'blue' } = defineProps<Props>()

const seed = Math.floor(Math.random() * Math.pow(2, 31)) + 1

const settings = useSettingsStore()

const { roughnessModifier } = storeToRefs(settings)

const svg = useTemplateRef('t')
const roughSvg = ref<RoughSVG>()

const svgNodes: SVGElement[] = []

watchEffect(() => {
	if (svg.value) roughSvg.value = rough.svg(svg.value)
})

useResizeObserver(svg, (entries) => {
	// should be just one
	const entry = entries.at(0)
	const rect = entry.target.getBoundingClientRect()

	if (!roughSvg.value || !svg.value) return

	svgNodes.map((node) => {
		const newNode = makeRectangle(roughSvg.value!, svg.value!)
		node.remove()
		svg.value!.appendChild(newNode)
		return newNode
	})
})

const makeRectangle = (
	roughSvg: RoughSVG,
	svgElement: SVGElement,
): SVGElement => {
	const { clientHeight, clientWidth } = svgElement

	return roughSvg.rectangle(5, 5, clientWidth - 10, clientHeight - 10, {
		fill: `var(--color-${fillColor}-300)`,
		fillStyle,
		roughness: roughnessModifier.value,
		strokeWidth: 3,
		bowing: 1,
		seed,
	})
}

watch([svg, roughSvg, roughnessModifier], () => {
	if (!svg.value || !roughSvg.value) return

	svgNodes.forEach((n) => n.remove())

	const rect = makeRectangle(roughSvg.value, svg.value)

	svgNodes.push(rect)
	svg.value.appendChild(rect)
})
</script>

<template>
	<button class="button">
		<svg class="svg" ref="t"></svg>
		<div class="slot"><slot /></div>
	</button>
</template>

<style scoped>
@reference '@/style.css';

.button {
	position: relative;
	cursor: pointer;
	overflow: visible;
}

.svg {
	width: 100%;
	height: 100%;
}

.slot {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>
