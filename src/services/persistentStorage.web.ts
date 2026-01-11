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

const initializeDefaults = () => {
	Object.entries(defaults).forEach(([key, value]) => {
		if (!localStorage.getItem(key) && value !== undefined) {
			localStorage.setItem(key, JSON.stringify(value))
		}
	})
}

initializeDefaults()

export const persistentStorage = {
	async get<K extends keyof StoredData = keyof StoredData>(
		key: K,
	): Promise<StoredData[K]> {
		const item = localStorage.getItem(key as string)
		return item ? JSON.parse(item) : defaults[key]
	},

	async delete<K extends keyof StoredData>(key: K) {
		localStorage.removeItem(key as string)
	},

	async set<K extends keyof StoredData>(
		key: K,
		value: StoredData[K],
	): Promise<void> {
		localStorage.setItem(key as string, JSON.stringify(value))
	},

	async has<K extends keyof StoredData>(key: K): Promise<boolean> {
		return localStorage.getItem(key as string) !== null
	},

	// async getAll(): Promise<StoredData> {
	// 	const result: StoredData = {}
	// 	Object.keys(defaults).forEach((key) => {
	// 		const item = localStorage.getItem(key)
	// 		if (item !== null) {
	// 			result[key as keyof StoredData] = JSON.parse(item)
	// 		}
	// 	})
	// 	return result
	// },

	async clear(): Promise<void> {
		localStorage.clear()
	},
}
