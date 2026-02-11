<script setup lang="ts">
import { Temporal } from 'temporal-polyfill'
import { computed, ref } from 'vue'
import { useTimeSync } from '../../composables/useTimeSync'
import UiTimestamp from './UiTimestamp.vue'

type Props = {
	timeFrom?: Temporal.ZonedDateTime
	duration: Temporal.Duration
}

const { duration, timeFrom } = defineProps<Props>()
const remaining = ref<Temporal.Duration>()

const end = computed(() =>
	(timeFrom ?? Temporal.Now.zonedDateTimeISO()).add(duration),
)

useTimeSync((now) => {})
</script>

<template>
	<UiTimestamp :time="remaining ?? duration" />
</template>
