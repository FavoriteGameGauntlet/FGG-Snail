import {
	createMemoryHistory,
	createRouter,
	type RouteRecordRaw,
} from 'vue-router'

import GamesView from '../views/Games/GamesView.vue'
import EffectsView from '../views/Effects/EffectsView.vue'
import LoginView from '../views/Login/LoginView.vue'
import RollsView from '../views/Rolls/RollsView.vue'
import RootView from '../views/Root/RootView.vue'
import SignUpView from '../views/SignUp/SignUpView.vue'
import TimerView from '../views/Timer/TimerView.vue'
import { authGuard } from './authGuard'
import { initialPathGuard } from './initialPathGuard'

// todo: add named routes
// https://router.vuejs.org/guide/essentials/named-routes.html

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: RootView,
		redirect: 'timer',
		children: [
			{
				path: 'timer',
				component: TimerView,
			},
			{
				path: 'games',
				component: GamesView,
			},
			{
				path: 'rolls',
				component: RollsView,
			},
			{
				path: 'effects',
				component: EffectsView,
			},
		],
	},
	{
		path: '/login',
		component: LoginView,
	},
	{
		path: '/signup',
		component: SignUpView,
	},
]

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

router.beforeEach(initialPathGuard)
router.beforeEach(authGuard)
