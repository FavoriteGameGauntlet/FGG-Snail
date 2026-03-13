<script setup lang="ts">
import { Temporal } from '@js-temporal/polyfill'
import { storeToRefs } from 'pinia'
import { computed, ref, useTemplateRef, watch, watchEffect } from 'vue'
import UiButton from '../../components/ui/UiButton.vue'
import UiTimestamp from '../../components/ui/UiTimestamp.vue'
import { useTimer } from '../../composables/useTimer'
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

const { elapsed, start, stop, isRunning } = useTimer({ mode: 'add' })

const onToggleButton = () => {
	if (isRunning.value) {
		stop()
	} else {
		start()
	}
}

const onAddTimeButton = () => {
	elapsed.value = elapsed.value.add({ seconds: 10 })
}

const onSubTimeButton = () => {
	elapsed.value = elapsed.value.subtract({ seconds: 10 })
}

const toggleButtonText = computed(() => (isRunning.value ? 'Стоп' : 'Старт'))
</script>

<template>
	<div class="flex w-full flex-col">
		<div class="big">
			<UiTimestamp :time="elapsed" />

			<UiButton class="time-button" @click="onToggleButton">{{
				toggleButtonText
			}}</UiButton>

			<UiButton class="time-button" @click="onAddTimeButton">+ 10 sec</UiButton>
			<UiButton class="time-button" @click="onSubTimeButton">- 10 sec</UiButton>
		</div>

		<div class="many">
			<UiTimestamp
				v-for="i in 100"
				:key="i"
				:time="elapsed.add({ seconds: 10 * i })"
			/>
		</div>

		<div class="flex w-240 flex-col">
			<div
				ref="button"
				class="flex w-full flex-row flex-wrap overflow-visible border-4 border-dashed border-black/20"
			>
				<UiButton class="button" :key="i" v-for="i in 10"> Test </UiButton>
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
