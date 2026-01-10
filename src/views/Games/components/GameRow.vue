<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
	computed,
	nextTick,
	ref,
	useTemplateRef,
	watch,
	watchEffect,
} from 'vue'
import { type UnplayedGame } from '../../../api-facade/models'
import { useGameStore } from '../../../stores/gameStore'

type Props = {
	gameIndex: number
}

const { gameIndex } = defineProps<Props>()

const gameStore = useGameStore()

const { unplayed: unplayedGames } = storeToRefs(gameStore)

const isEditing = ref(false)
const inputEl = useTemplateRef('rename-input')

const game = computed<TempGame | undefined>(() =>
	games.value.find((g) => g.id === gameId),
)

const viewGameName = ref<string | undefined>()

watch(
	game,
	() => {
		console.log('watch')
		viewGameName.value = game.value?.name
	},
	{ immediate: true },
)

watchEffect(() => {
	if (!isEditing.value) return

	nextTick(() => {
		inputEl.value?.focus()
		inputEl.value?.select()
	})
})

const enableEditing = () => {
	isEditing.value = true
	viewGameName.value = game.value?.name
}

const editGameName = (name?: string) => {
	if (!name) {
		return
	}

	isEditing.value = false
	gameStore.editOne({ id: gameId, name })
}

const onRenameInputBlur = () => editGameName(viewGameName.value)
const onRenameInputFocusIn = () => enableEditing()
const onRenameInputFocusOut = () => editGameName(viewGameName.value)

const onRenameButtonClick = () => enableEditing()
const onRenameButtonFocusIn = () => enableEditing()

const onFormSubmit = () => editGameName(viewGameName.value)

const onDeleteButtonClick = () => gameStore.deleteOne(gameId)
</script>

<template>
	<li
		class="game-row px-6 py-2 h-12 hover:bg-slate-100 flex justify-between items-center"
		v-if="game"
	>
		<button
			class="cursor-pointer flex gap-2"
			v-show="!isEditing"
			@focusin="onRenameButtonFocusIn"
			@click="onRenameButtonClick"
		>
			<span>{{ viewGameName }}</span>
			<span class="edit-icon hidden">✏️</span>
		</button>

		<form type="text" @submit.prevent="onFormSubmit">
			<input
				type="text"
				ref="rename-input"
				v-model.trim="viewGameName"
				v-show="isEditing"
				@focusin="onRenameInputFocusIn"
				@focusout="onRenameInputFocusOut"
				@blur="onRenameInputBlur"
			/>
		</form>

		<button
			class="trash-button hover:bg-red-200 size-8 cursor-pointer"
			v-if="!isEditing"
			@click="onDeleteButtonClick"
		>
			🗑
		</button>
	</li>
</template>

<style scoped>
@reference '@/style.css';
</style>
