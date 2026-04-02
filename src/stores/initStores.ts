import { useFeatureGameStore } from './feature/featureGameStore'
import { useFeatureTimerStore } from './feature/featureTimerStore'
import { useFeatureUserStore } from './feature/featureUserStore'
import { useFeatureWheelStore } from './feature/featureWheelStore'

export const initStores = () => {
	useFeatureWheelStore().init()
	useFeatureGameStore().init()
	useFeatureTimerStore().init()
	useFeatureUserStore().init()
}
