<script setup lang="ts">
import type { Temporal } from '@js-temporal/polyfill'
import { computed } from 'vue'

type Props = {
	time: Temporal.PlainTime | Temporal.Duration | Temporal.PlainDateTime
}

const { time } = defineProps<Props>()

const formatDuration = (duration: Temporal.Duration) => {
	const ad = duration.abs()
	return `${duration.sign === -1 ? '-' : ''}${ad.hours}:${ad.minutes.toString().padStart(2, '0')}:${ad.seconds.toString().padStart(2, '0')}`
}

const formatTime = (time: Temporal.PlainTime | Temporal.PlainDateTime) =>
	`${time.hour}:${time.minute.toString().padStart(2, '0')}:${time.second.toString().padStart(2, '0')}`

const formattedTime = computed(() => {
	if ('hours' in time) {
		return formatDuration(time)
	} else {
		return formatTime(time)
	}
})
</script>

<template>
	<div class="font-mono leading-[80%] tracking-normal">
		{{ formattedTime }}
	</div>
</template>

<style scoped></style>
