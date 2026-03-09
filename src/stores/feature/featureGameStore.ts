import { defineStore } from 'pinia'
import { StoreName } from '../../enums/storeName'
import { computed, ref } from 'vue'
import { CurrentGame, WishlistedGame } from '../../api-facade/models'
import { LoadingState, useLoading } from '../../composables/useLoading'
import { useApiGameStore } from '../api/apiGameStore'
import { useAuthStore } from '../authStore'

export const useFeatureGameStore = defineStore(StoreName.FeatureGame, () => {
	const current = ref<CurrentGame | null>(null)
	const wishlist = ref<WishlistedGame[]>([])

	const authStore = useAuthStore()
	const apiGameStore = useApiGameStore()

	const currentLoading = useLoading()
	const wishlistLoading = useLoading()

	const enoughGamesInWishlist = computed(() => wishlist.value.length >= 6)
	const currentGameIsFinished = computed(() => current.value === null)

	const canRoll = computed(
		() =>
			currentGameIsFinished.value &&
			currentLoading.state.value === LoadingState.LOADED &&
			enoughGamesInWishlist.value &&
			wishlistLoading.state.value === LoadingState.LOADED,
	)

	const roll = async () => {
		if (!canRoll.value) return Promise.reject('Bitch you cannot roll games')
		if (!authStore.login) return Promise.reject('Bitch you gotta be logged in')

		return apiGameStore.roll(authStore.login)
	}

	return {
		current,
		wishlist,

		currentLoading,
		wishlistLoading,

		enoughGamesInWishlist,
		currentGameIsFinished,

		canRoll,

		roll,
	}
})
