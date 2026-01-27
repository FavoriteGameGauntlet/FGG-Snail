<script setup lang="ts">
import { computed, ref } from 'vue'

const visibleItems = 5

const enum Mode {
	Games,
	Effects,
}

const mode = ref(Mode.Games)

const modeButtonModeToTextMap: Record<Mode, string> = {
	[Mode.Effects]: 'Эффекты',
	[Mode.Games]: 'Игры',
}

const modeButtonText = computed(() => modeButtonModeToTextMap[mode.value])

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
