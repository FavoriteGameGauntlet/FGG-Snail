<script setup lang="ts">
import { RouteName } from '../../../router/routeNames'

defineProps<{ to: RouteName }>()
</script>

<template>
	<RouterLink
		class="navbar-link"
		activeClass="navbar-link--active"
		:to="{ name: to }"
	>
		<slot />
	</RouterLink>
</template>

<style scoped>
.navbar-link {
	color: #2b7fff;
	text-decoration: none;
}

.navbar-link:hover {
	text-decoration: underline;
}

.navbar-link--active {
	text-decoration: underline;
}
</style>
