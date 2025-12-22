import {
	createMemoryHistory,
	createRouter,
	type RouteRecordRaw,
} from 'vue-router'

import GamesView from '../views/Games/GamesView.vue'
import HomeView from '../views/Home/HomeView.vue'
import LoginView from '../views/Login/LoginView.vue'
import RollsView from '../views/Rolls/RollsView.vue'
import RootView from '../views/Root/RootView.vue'
import SignupView from '../views/Signup/SignupView.vue'
import TimerView from '../views/Timer/TimerView.vue'
import { authGuard } from './authGuard'
import { initialPathGuard } from './initialPathGuard'

// todo: add named routes
// https://router.vuejs.org/guide/essentials/named-routes.html

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: RootView,
		children: [
			{
				path: '',
				component: HomeView,
			},
			{
				path: 'games',
				component: GamesView,
			},
			{
				path: 'timer',
				component: TimerView,
			},
			{
				path: 'rolls',
				component: RollsView,
			},
		],
	},
	{
		path: '/login',
		component: LoginView,
	},
	{
		path: '/signup',
		component: SignupView,
	},
]

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

router.beforeEach(initialPathGuard)
router.beforeEach(authGuard)
