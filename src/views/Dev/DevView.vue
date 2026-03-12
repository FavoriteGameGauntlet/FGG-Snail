<script setup lang="ts">
import { storeToRefs } from 'pinia'
import UiButton from '../../components/ui/UiButton.vue'
import { ref, useTemplateRef, watch, watchEffect } from 'vue'
import { useSettingsStore } from '../../stores/settingsStore'
import UiTimestamp from '../../components/ui/UiTimestamp.vue'
import { useTimeSync } from '../../composables/useTimeSync'
import { Temporal } from '@js-temporal/polyfill'

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

const elapsed = ref(Temporal.Duration.from({ seconds: 0 }))
let baseElapsed = Temporal.Duration.from({ seconds: 0 })
let startedAt: Temporal.Instant | null = null
let stopTimeSync: (() => void) | null = null

const start = () => {
	if (stopTimeSync) return
	;({ stop: stopTimeSync, startedAt } = useTimeSync(({ now }) => {
		elapsed.value = baseElapsed.add(now.since(startedAt!))
	}))
}

const stop = () => {
	if (!stopTimeSync) return

	stopTimeSync()
	stopTimeSync = null
	baseElapsed = elapsed.value
	startedAt = null
}
</script>

<template>
	<div class="flex w-full flex-col">
		<div class="big">
			<UiTimestamp :time="elapsed" />

			<UiButton class="time-button" @click="start">Start</UiButton>
			<UiButton class="time-button" @click="stop">Stop</UiButton>
		</div>

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

.big {
	height: 800px;
	width: 100%;
	display: flex;
	font-size: 3rem;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.time-button {
	height: 80px;
}
</style>
