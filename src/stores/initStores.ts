import { useFeatureGameStore } from './feature/featureGameStore'
import { useFeatureTimerStore } from './feature/featureTimerStore'
import { useFeatureWheelStore } from './feature/featureWheelStore'

export const initStores = () => {
	useFeatureWheelStore().init()
	useFeatureGameStore().init()
	useFeatureTimerStore().init()
}
