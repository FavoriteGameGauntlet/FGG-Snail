<script setup lang="ts">
import { useTemplateRef, watchEffect } from 'vue'
import rough from 'roughjs'

const svgTest = useTemplateRef('t')

const stop = watchEffect(() => {
	if (!svgTest.value) return

	const roughSvg = rough.svg(svgTest.value)
	const rect = roughSvg.rectangle(10, 10, 200, 200, { fill: '#ffffff' })
	svgTest.value.appendChild(rect) // <- here
	stop()
})
</script>

<template>
	<div class="w-full flex flex-col">
		<div class="w-180">
			<svg ref="t" class="w-70 h-70"></svg>
		</div>
	</div>
</template>
