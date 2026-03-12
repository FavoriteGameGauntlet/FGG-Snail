<script setup lang="ts">
import UiButton from '../../components/ui/UiButton.vue'
import { RouterLink } from 'vue-router'
import { useFeatureWheelStore } from '../../stores/feature/featureWheelStore'
import { computed, onMounted } from 'vue'
import { funnyEffects } from './constants/funnyEffects'

const visibleCount = 5

const wheelStore = useFeatureWheelStore()

const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min)
}

const getRandomItems = <T,>(collection: T[], count: number = 1): T[] => {
	const randomizedCollection: T[] = []

	for (let i = 0; i < count; i++) {
		if (collection.length <= count) break

		getRandomNumber(0, collection.length)
		randomizedCollection.push(collection.at(i)!)
	}

	return randomizedCollection
}

const visibleEffects = computed(() => {
	if (wheelStore.currentEffects) {
		return wheelStore.currentEffects
	}

	if (wheelStore.availableEffects) {
		return getRandomItems(wheelStore.availableEffects, 5)
	}

	return getRandomItems(funnyEffects, 5)
})

const onRollButtonClick = () => {
	wheelStore.roll()
}

onMounted(() => {
	wheelStore.getLastRoll()
	wheelStore.getAvailableEffects()
})
</script>

<template>
	<div class="grid h-full place-content-center gap-12">
		<RouterLink
			class="place-self-center text-blue-500 hover:underline"
			to="/rolls/games"
		>
			Игры
		</RouterLink>

		<h1 class="text-center text-4xl font-semibold">Роллы</h1>

		<div class="flex gap-4 border border-slate-200">
			<div
				class="h-40 w-30 border border-slate-500"
				:key="i"
				v-for="i in visibleCount"
			>
				{{ visibleEffects.at(i)?.name ?? 'кто прочитал тот фурри' }}
			</div>
		</div>

		<UiButton class="roll-button" @click="onRollButtonClick">
			<!-- :disabled="wheelStore.pendingRoll" -->
			Прокрутить
		</UiButton>
	</div>
</template>

<style scoped>
.roll-button {
	height: 56px;
	width: 224px;
	justify-self: center;
}
</style>
