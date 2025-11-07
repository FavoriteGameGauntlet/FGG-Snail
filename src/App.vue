<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useShortcuts } from './composables/useShortcuts'

useShortcuts()
</script>

<template>
	<RouterView />
</template>
