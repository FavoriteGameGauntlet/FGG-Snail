<script setup lang="ts">
import { RouterLink } from 'vue-router'

const visibleItems = 5

const onRollButtonClick = () => {}
</script>

<template>
	<div class="grid h-full place-content-center gap-12">
		<RouterLink
			class="place-self-center text-blue-500 hover:underline"
			to="/rolls/games"
			>Игры</RouterLink
		>

		<h1 class="text-center text-4xl font-semibold">Роллы</h1>

		<div class="flex gap-4 border border-slate-200">
			<div
				class="h-40 w-30 border border-slate-500"
				:key="i"
				v-for="i in visibleItems"
			>
				{{ i }}
			</div>
		</div>

		<button
			class="w-fit cursor-pointer justify-self-center bg-slate-200 px-8 py-2 hover:bg-slate-300"
			@click="onRollButtonClick"
		>
			Прокрутить
		</button>
	</div>
</template>

<style scoped></style>
