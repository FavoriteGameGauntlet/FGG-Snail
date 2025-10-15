import { load, type Store } from '@tauri-apps/plugin-store'

export enum StoreKey {
	UserName = 'userName',
	UserId = 'userId',
}

export type StoredData = {
	[StoreKey.UserName]: string | null
	[StoreKey.UserId]: string | null
}

const defaults: StoredData = {
	[StoreKey.UserName]: null,
	[StoreKey.UserId]: null,
}

let store: Store | null = null

const getStore = async () => {
	if (!store) {
		store = await load('store.json', { autoSave: true, defaults })
	}
	return store
}

export const persistentStorage = {
	async get<K extends keyof StoredData>(
		key: K,
	): Promise<StoredData[K] | undefined> {
		const s = await getStore()
		return s.get<StoredData[K]>(key)
	},

	async delete<K extends keyof StoredData>(key: K) {
		const s = await getStore()
		return s.delete(key)
	},

	async set<K extends keyof StoredData>(
		key: K,
		value: StoredData[K],
	): Promise<void> {
		const s = await getStore()
		return s.set(key, value)
	},
}
