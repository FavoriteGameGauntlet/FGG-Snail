<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useGameStore } from '../../stores/gameStore'

const rollStore = useGameStore()

const rollText = ref('Крути барабан')

const onRollButtonClick = () => {}
</script>

<template>
	<div class="grid place-content-center h-full gap-12">
		<RouterLink to="/rolls/effects">Эффекты</RouterLink>

		<h1 class="text-4xl font-semibold text-center">Роллы</h1>

		<div
			class="flex w-full h-40 gap-4 border-slate-200 border items-center justify-center"
		>
			<div>{{ rollText }}</div>
		</div>

		<button
			class="bg-slate-200 py-2 px-8 w-fit justify-self-center cursor-pointer hover:bg-slate-300"
			@click="onRollButtonClick"
		>
			Прокрутить
		</button>
	</div>
</template>

<style scoped></style>
