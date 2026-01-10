<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useShortcuts } from './composables/useShortcuts'
import { useTimerStore } from './stores/timerStore'
import { useGameStore } from './stores/gameStore'

useShortcuts()
useTimerStore().init()
useGameStore().init()
</script>

<template>
	<RouterView />
</template>
