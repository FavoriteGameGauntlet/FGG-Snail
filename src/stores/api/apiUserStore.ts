import { defineStore } from 'pinia'
import { StoreName } from '../../enums/storeName'
import { ref } from 'vue'
import { api } from '../../api-facade/api'
import { type Login } from '../../api-facade/models/users-models'
import { LoadingState, useLoading } from '../../composables/useLoading'
import { usePersistentRef } from '../../composables/usePersistentRef'
import { StoreKey } from '../../services/persistentStorage'

export const useApiUserStore = defineStore(StoreName.ApiUser, () => {
	const users = ref<Login[] | null>(null)
	const { state: currentUserDisplayName } = usePersistentRef(
		StoreKey.DisplayName,
	)

	const getAllNamesLoading = useLoading()
	const getDisplayNameLoading = useLoading()
	const setDisplayLoading = useLoading()

	const getAllUsers = async () => {
		if (getAllNamesLoading.state.value === LoadingState.LOADING) return

		getAllNamesLoading.state.value = LoadingState.LOADING

		await api.users
			.getAllNames()
			.then((newUsers) => {
				users.value = newUsers
				getAllNamesLoading.state.value = LoadingState.LOADED
			})
			.catch((error) => {
				getAllNamesLoading.state.value = LoadingState.ERROR

				throw error
			})
	}

	const getDisplayName = async () => {
		if (getDisplayNameLoading.state.value === LoadingState.LOADING) return

		getDisplayNameLoading.state.value = LoadingState.LOADING

		await api.users
			.getDisplayName()
			.then((name) => {
				currentUserDisplayName.value = name
				getDisplayNameLoading.state.value = LoadingState.LOADED
			})
			.catch((error) => {
				getDisplayNameLoading.state.value = LoadingState.ERROR

				throw error
			})
	}

	const setDisplayName = async (newName: string) => {
		if (setDisplayLoading.state.value === LoadingState.LOADING) return

		const oldName = currentUserDisplayName.value
		currentUserDisplayName.value = newName
		setDisplayLoading.state.value = LoadingState.LOADING

		await api.users
			.postDisplayName({ body: newName })
			.then(() => {
				setDisplayLoading.state.value = LoadingState.LOADED
			})
			.catch((error) => {
				setDisplayLoading.state.value = LoadingState.ERROR
				currentUserDisplayName.value = oldName

				throw error
			})
	}

	return {
		users,
		currentUserDisplayName,

		getAllNamesLoading,
		getDisplayNameLoading,
		setDisplayLoading,

		getAllUsers,
		getDisplayName,
		setDisplayName,
	}
})
