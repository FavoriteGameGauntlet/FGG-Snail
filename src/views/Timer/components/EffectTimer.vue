<script setup lang="ts">
import UiTimestamp from '../../../components/ui/UiTimestamp.vue'
import { useTimer } from '../../../composables/useTimer'
import { useFeatureTimerStore } from '../../../stores/feature/featureTimerStore'

const { elapsed, isRunning, set, start, stop } = useTimer('subtract')

const timerStore = useFeatureTimerStore()
</script>

<template>
	<UiTimestamp />
</template>

<style scoped></style>
