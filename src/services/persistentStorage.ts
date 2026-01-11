import { load, type Store } from '@tauri-apps/plugin-store'

export enum StoreKey {
	InitialRoute = 'initialRoute',
	UserName = 'userName',
}

export type StoredData = Partial<{
	[StoreKey.InitialRoute]: string
	[StoreKey.UserName]: string
}>

const defaults: StoredData = {
	[StoreKey.InitialRoute]: undefined,
	[StoreKey.UserName]: undefined,
} as const

let store: Store | null = null
const storeLoader = load('store.json', { autoSave: true, defaults })

const getStore = async () => {
	store ??= await storeLoader
	return store
}

export const persistentStorage = {
	async get<K extends keyof StoredData = keyof StoredData>(
		key: K,
	): Promise<StoredData[K]> {
		console.log('[STORAGE] get', { key })
		const s = await getStore()
		return s.get<StoredData[K]>(key)
	},

	async delete<K extends keyof StoredData>(key: K) {
		console.log('[STORAGE] delete', { key })
		const s = await getStore()
		return s.delete(key)
	},

	async set<K extends keyof StoredData>(
		key: K,
		value: StoredData[K],
	): Promise<void> {
		console.log('[STORAGE] set', { key, value })
		const s = await getStore()
		return s.set(key, value)
	},

	async has<K extends keyof StoredData>(key: K): Promise<boolean> {
		const s = await getStore()
		return s.has(key)
	},

	// async getAll(): Promise<StoredData> {
	// 	const s = await getStore()
	// 	return (await s.entries<StoredData[keyof StoredData]>()).reduce<StoredData>(
	// 		(acc, [k, v]) => {
	// 			acc[k as keyof StoredData] = v
	// 			return acc
	// 		},
	// 		{},
	// 	)
	// },

	async clear(): Promise<void> {
		console.log('[STORAGE] clear')

		return await (await getStore()).clear()
	},
}
