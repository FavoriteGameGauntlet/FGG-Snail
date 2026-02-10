<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Temporal } from 'temporal-polyfill'
import UiTimestamp from './UiTimestamp.vue'
import { useTimeSync } from '../../composables/useTimeSync'

type Props = {
	timeFrom: Temporal.ZonedDateTime
	duration: Temporal.Duration
}

const { duration, timeFrom } = defineProps<Props>()
const remaining = ref<Temporal.Duration>()

const end = computed(() => timeFrom.add(duration))

useTimeSync((now) => {})
</script>

<template>
	<UiTimestamp v-if="remaining" :time="remaining" />
</template>
