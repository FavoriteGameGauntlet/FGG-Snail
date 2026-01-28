<script setup lang="ts">
import { computed } from 'vue'
import { usePersistentRef } from '../../composables/usePersistentRef'
import { StoreKey } from '../../services/persistentStorage'
import { RollsViewMode as Mode } from './enums/rolls-view-mode'

const visibleItems = 5

const { state: mode } = usePersistentRef(StoreKey.RollsViewMode)

const modeButtonModeToTextMap: Record<Mode, string> = {
	[Mode.Effects]: 'Эффекты',
	[Mode.Games]: 'Игры',
}

const modeButtonText = computed(
	() => modeButtonModeToTextMap[mode.value ?? Mode.Games],
)

const onChangeModeButtonClick = () => {
	mode.value = mode.value === Mode.Effects ? Mode.Games : Mode.Effects
}

const onRollButtonClick = () => {}
</script>

<template>
	<div class="grid place-content-center h-full gap-12">
		<button @click="onChangeModeButtonClick">{{ modeButtonText }}</button>

		<h1 class="text-4xl font-semibold text-center">Роллы</h1>

		<div class="flex gap-4 border-slate-200 border">
			<div
				class="w-30 h-40 border-slate-500 border"
				:key="i"
				v-for="i in visibleItems"
			>
				{{ i }}
			</div>
		</div>

		<button @click="onRollButtonClick">Прокрутить</button>
	</div>
</template>

<style scoped></style>
