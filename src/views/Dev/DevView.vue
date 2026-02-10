<script setup lang="ts">
import { storeToRefs } from 'pinia'
import UiButton from '../../components/ui/UiButton.vue'
import { ref, useTemplateRef, watch, watchEffect } from 'vue'
import { useSettingsStore } from '../../stores/settingsStore'

const button = useTemplateRef('button')

const settings = useSettingsStore()
const { roughnessModifier } = storeToRefs(settings)

const roughnessValue = ref(roughnessModifier.value.toString())

const buttonWidth = ref('200')

watchEffect(() => {
	if (!button.value) return

	button.value.style.setProperty('--basis', buttonWidth.value + 'px')
})

watch([roughnessValue], () => {
	roughnessModifier.value = Number.isNaN(+roughnessValue.value)
		? 1
		: +roughnessValue.value
})
</script>

<template>
	<div class="flex w-full flex-col">
		<div class="flex w-240 flex-col">
			<div
				ref="button"
				class="flex w-full flex-row flex-wrap overflow-visible border-4 border-dashed border-black/20"
			>
				<UiButton class="button" :key="i" v-for="i in 100"> Test </UiButton>
			</div>

			<code>roughness</code>

			<input v-model="roughnessValue" />

			<code>width</code>

			<input type="range" v-model="buttonWidth" min="100" max="400" />
		</div>
	</div>
</template>

<style scoped>
.button {
	flex-basis: var(--basis);
	height: 48px;
}
</style>
