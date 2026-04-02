<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { LoadingState } from '../../../composables/useLoading'
import { useAuthStore } from '../../../stores/authStore'
import { useFeatureUserStore } from '../../../stores/feature/featureUserStore'

const authStore = useAuthStore()
const userStore = useFeatureUserStore()

const { login } = storeToRefs(authStore)

const showForm = ref(false)
const newName = ref<string | null>(null)
const mirrorText = ref('')

const nameInput = useTemplateRef('nameInput')

const isLoading = computed(
	() => userStore.setDisplayLoading.state === LoadingState.LOADING,
)

watch(newName, (newName) => {
	mirrorText.value = newName ?? userStore.currentUser.login ?? ''
})

const closeForm = () => {
	showForm.value = false
	newName.value = null
}

const onEditButtonClick = async () => {
	showForm.value = true
	newName.value = userStore.currentUser.displayName ?? ''

	await nextTick()

	nameInput.value?.focus()
}

const onFormSubmit = () => {
	if (!newName.value || isLoading.value) {
		return
	}

	if (newName.value === userStore.currentUser.displayName) {
		closeForm()
		return
	}

	userStore.setDisplayName(newName.value).then(() => {
		showForm.value = false
	})
}

const onCancelButtonClick = () => {
	closeForm()
}

const onEscKeyDown = () => {
	closeForm()
}
</script>

<template>
	<div>
		<button
			class="edit-button"
			v-if="!showForm"
			:disabled="userStore.getDisplayNameLoading.state === LoadingState.LOADING"
			@click="onEditButtonClick"
		>
			{{ login }} <span class="pencil-icon">✏️</span>
		</button>

		<form class="name-form" v-else @submit.prevent="onFormSubmit">
			<div class="resize-container">
				<span class="resize-text">{{ mirrorText }}</span>

				<input
					class="name-input"
					ref="nameInput"
					:placeholder="userStore.currentUser.login"
					:disabled="isLoading"
					@keydown.esc="onEscKeyDown"
					v-model="newName"
				/>
			</div>

			<button class="icon-button" :disabled="isLoading">✅</button>

			<button
				class="icon-button"
				type="button"
				:disabled="isLoading"
				@click="onCancelButtonClick"
			>
				❌
			</button>
		</form>
	</div>
</template>

<style scoped>
.icon-button,
.edit-button {
	cursor: pointer;
}

.pencil-icon {
	opacity: 0;
}

.edit-button:not([disabled]):where(:hover, :focus-visible) .pencil-icon {
	opacity: 1;
}

.name-form {
	display: flex;
	gap: 8px;
}

.resize-container {
	display: inline-block;
	position: relative;
}

.resize-text,
.name-input {
	font: inherit;
	padding: 0;
	margin: 0;
}

.resize-text {
	display: inline-block;
	visibility: hidden;
	white-space: pre;
}

.name-input {
	position: absolute;
	inset: 0;
	width: 100%;
}

.name-input:focus-visible {
	outline: none;
}
</style>
