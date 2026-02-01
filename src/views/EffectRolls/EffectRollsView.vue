<script setup lang="ts">
import { RouterLink } from 'vue-router'

const visibleItems = 5

const onRollButtonClick = () => {}
</script>

<template>
	<div class="grid place-content-center h-full gap-12">
		<RouterLink
			class="place-self-center hover:underline text-blue-500"
			to="/rolls/games"
			>Игры</RouterLink
		>

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

		<button
			class="bg-slate-200 py-2 px-8 w-fit justify-self-center cursor-pointer hover:bg-slate-300"
			@click="onRollButtonClick"
		>
			Прокрутить
		</button>
	</div>
</template>

<style scoped></style>
