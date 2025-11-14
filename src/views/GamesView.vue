<script setup lang="ts">
type Game = {
	id: number
	name: string
}

const games: Game[] = [
	{ id: 1, name: 'Amogus 3D' },
	{ id: 1, name: 'Wolf Amougs' },
	{ id: 1, name: 'GTA VI' },
	{ id: 1, name: 'Deadlock' },
	{ id: 1, name: 'Minecraft' },
]
</script>

<template>
	<div class="flex flex-col gap-8 px-12 py-8">
		<div class="grid grid-cols-[1fr_auto_auto] gap-4 items-center ps-6">
			<h1 class="text-4xl">Игры</h1>

			<button class="title-button bg-cyan-200">Импорт</button>

			<button class="title-button bg-purple-200">Экспорт</button>
		</div>

		<ul class="flex flex-col">
			<li
				class="game-row px-6 py-2 h-12 hover:bg-slate-100 flex justify-between items-center"
				:key="game.id"
				v-for="game in games"
			>
				<button class="cursor-pointer flex gap-2">
					<span>{{ game.name }}</span>

					<span class="edit-icon hidden">✏️</span>
				</button>

				<button class="trash-button hover:bg-red-200 size-8 cursor-pointer">
					🗑
				</button>
			</li>
		</ul>
	</div>
</template>

<style scoped>
@reference '../style.css';

.title-button {
	@apply cursor-pointer px-4 py-2;
}

.game-row :where(.edit-icon, .trash-button) {
	@apply hidden;
}

.game-row:hover :where(.edit-icon, .trash-button) {
	@apply block;
}
</style>
