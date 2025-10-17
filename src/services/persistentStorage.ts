import { load, type Store } from '@tauri-apps/plugin-store'

export enum StoreKey {
	UserName = 'userName',
	UserId = 'userId',
}

export type StoredData = Partial<{
	[StoreKey.UserName]: string
	[StoreKey.UserId]: string
}>

const defaults: StoredData = {
	[StoreKey.UserName]: undefined,
	[StoreKey.UserId]: undefined,
} as const

let store: Store | null = null
const storeLoader = load('store.json', { autoSave: true, defaults })

const getStore = async () => (store ??= await storeLoader)

export const persistentStorage = {
	async get<K extends keyof StoredData = keyof StoredData>(
		key: K,
	): Promise<StoredData[K]> {
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

	async has<K extends keyof StoredData>(key: K): Promise<boolean> {
		const s = await getStore()
		return s.has(key)
	},
}
