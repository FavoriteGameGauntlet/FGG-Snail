import EffectRollsView from '../views/EffectRolls/EffectRollsView.vue'
import EffectsView from '../views/Effects/EffectsView.vue'
import GameRollsView from '../views/GameRolls/GameRollsView.vue'
import GamesView from '../views/Games/GamesView.vue'
import LoginView from '../views/Login/LoginView.vue'
import RootView from '../views/Root/RootView.vue'
import SignUpView from '../views/SignUp/SignUpView.vue'
import TimerView from '../views/Timer/TimerView.vue'
import DevView from '../views/Dev/DevView.vue'
import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from './routeNames'
import PlayersView from '../views/Players/PlayersView.vue'

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: RootView,
		name: RouteName.Root,
		redirect: 'timer',

		children: [
			{
				path: 'timer',
				component: TimerView,
				name: RouteName.Timer,
			},

			{
				path: 'players',
				component: PlayersView,
				name: RouteName.Players,
			},

			{
				path: 'games',
				component: GamesView,
				name: RouteName.Games,
			},

			{
				path: 'rolls',
				redirect: 'rolls/effects',
				children: [
					{
						path: 'effects',
						component: EffectRollsView,
						name: RouteName.RollEffects,
					},

					{
						path: 'games',
						component: GameRollsView,
						name: RouteName.RollGames,
					},
				],
			},

			{
				path: 'effects',
				component: EffectsView,
				name: RouteName.Effects,
			},

			{
				path: 'dev',
				component: DevView,
				name: RouteName.Dev,
			},
		],
	},
	{
		path: '/login',
		component: LoginView,
		name: RouteName.Login,
	},

	{
		path: '/signup',
		component: SignUpView,
		name: RouteName.Signup,
	},

	{
		path: '/:pathMatch(.*)*',
		redirect: { name: RouteName.Timer },
	},
]
