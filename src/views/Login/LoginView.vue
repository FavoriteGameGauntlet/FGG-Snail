<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { type HttpErrorResponse } from '../../api-facade/http'
import { usePersistentRef } from '../../composables/usePersistentRef'
import { StoreKey } from '../../services/persistentStorage.web'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const userName = ref('')
const password = ref('')

const isUserNameDirty = ref(false)
const isPasswordDirty = ref(false)

const errors = ref<Partial<Record<'name' | 'password', string>>>({})

const isAuthError = ref(false)

const serverError = ref<string>()

const loginInput = useTemplateRef('loginInput')
const passwordInput = useTemplateRef('passwordInput')

// yes, i know this is not optimal and ugly as hell. I don't care. It works.

watch(
	userName,
	(name) => {
		if (!name) {
			errors.value.name = 'Обязательное поле'
			return
		}

		if (name.length < 3) {
			errors.value.name = 'Минимальная длина - 3 символов'
			return
		}

		if (name.length > 35) {
			errors.value.name = 'Максимальная длина - 35 символов'
			return
		}

		if (!/^[0-9a-zA-Z_]+$/.test(name)) {
			errors.value.name =
				'Допускаются только латинские буквы, цифры и нижние подчёркивания'
			return
		}

		errors.value.name = undefined
	},
	{ immediate: true },
)

watch(
	password,
	(password) => {
		if (!password) {
			errors.value.password = 'Обязательное поле'
			return
		}

		if (password.length < 8) {
			errors.value.password = 'Минимальная длина - 8 символов'
			return
		}

		if (password.length > 35) {
			errors.value.password = 'Максимальная длина - 35 символов'
			return
		}

		if (!/^[a-zA-Z\d !"#$%&'()*+,-./=:;<>?@[\]\\^_|{}~]+$/.test(password)) {
			errors.value.password =
				'Допускаются только латинские буквы и специальные символы'
			return
		}

		errors.value.password = undefined
	},
	{ immediate: true },
)

const onFormSubmit = () => {
	isUserNameDirty.value = true
	isPasswordDirty.value = true

	if (Object.values(errors.value).filter(Boolean).length) return

	authStore
		.logIn({ login: userName.value, password: password.value })
		.then(() => router.push('/'))
		.catch((e: HttpErrorResponse) => {
			if (e.body?.code === 'WRONG_AUTH_DATA') {
				isAuthError.value = true
			}
		})
}

onMounted(async () => {
	// todo fix this mess. This should just work, but it don't
	usePersistentRef(StoreKey.UserName, (storedUserName) => {
		userName.value = storedUserName ?? ''

		if (userName.value) {
			passwordInput.value?.focus()
		} else {
			loginInput.value?.focus()
		}
	})
})
</script>

<template>
	<div class="grid h-full w-full place-content-center gap-4">
		<h1 class="w-60 text-3xl font-bold">Вход</h1>

		<form class="flex w-80 flex-col gap-2" @submit.prevent="onFormSubmit">
			<input
				class="rounded-md border border-slate-400 px-2 py-0.5"
				placeholder="Логин"
				ref="loginInput"
				v-model.trim="userName"
				@blur="isUserNameDirty = true"
			/>

			<div class="error" v-if="errors.name && isUserNameDirty">
				{{ errors.name }}
			</div>

			<input
				class="rounded-md border border-slate-400 px-2 py-0.5"
				type="password"
				placeholder="Пароль"
				ref="passwordInput"
				v-model="password"
				@blur="isPasswordDirty = true"
			/>

			<div class="error" v-if="errors.password && isPasswordDirty">
				{{ errors.password }}
			</div>

			<div class="error" v-if="serverError">
				{{ serverError }}
			</div>

			<div class="error" v-if="isAuthError">Неправильный логин или пароль.</div>

			<button class="rounded-md bg-emerald-200 py-0.5">Войти</button>

			<div class="place-self-center text-center text-sm">
				Ещё не участвуешь в ивенте?

				<RouterLink to="signup" class="text-cyan-700">
					Зарегистрироваться
				</RouterLink>
			</div>
		</form>
	</div>
</template>

<style scoped>
@reference "@/style.css";

.field {
	@apply rounded-md border border-slate-400 px-2 py-0.5;
}

.error {
	@apply flex flex-col gap-1 rounded-md bg-red-50 px-2 py-1 text-sm leading-5 text-red-950;
}
</style>
