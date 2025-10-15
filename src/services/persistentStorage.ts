import { load, Store } from '@tauri-apps/plugin-store'
// when using `"withGlobalTauri": true`, you may use
// const { load } = window.__TAURI__.store;

// Create a new store or load the existing one,
// note that the options will be ignored if a `Store` with that path has already been created
const store = await load('store.json', { autoSave: true, defaults: {} })

// Set a value.
await store.set('some-key', { value: 5 })

// Get a value.
const val = await store.get<{ value: number }>('some-key')
console.log(val) // { value: 5 }

// You can manually save the store after making changes.
// Otherwise, it will save upon graceful exit
// And if you set `autoSave` to a number or left empty,
// it will save the changes to disk after a debounce delay, 100ms by default.
await store.save()

export class PersistentStorage {
	private loader = load('store.json', { autoSave: true, defaults: {} })
	private store: Store | null = null

	async init() {
		this.store = await this.loader
	}
}
