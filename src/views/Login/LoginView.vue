<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
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

		if (!/^[a-zA-Z_]+$/.test(name)) {
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

		if (
			!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./=:;<>?@[\]\\^_|{}~]).+$/g.test(
				password,
			)
		) {
			errors.value.password =
				'В пароле должны быть: одна прописная буква, одна заглавная, одна цифра, один специальный символ'
			return
		}

		errors.value.password = undefined
	},
	{ immediate: true },
)

const onFormSubmit = () => {
	isUserNameDirty.value = true
	isPasswordDirty.value = true

	if (Object.values(errors).filter(Boolean)) {
		return
	}

	authStore
		.logIn(userName.value, password.value)
		.then(() => router.push('/'))
		.catch((e) => {
			if (e['body']['code'] === 'WRONG_AUTH_DATA') {
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

		<form class="flex w-full flex-col gap-2" @submit.prevent="onFormSubmit">
			<input
				class="rounded-md border border-slate-400 px-2 py-0.5"
				placeholder="Логин"
				ref="loginInput"
				v-model.trim="userName"
				@blur="isUserNameDirty = true"
			/>
			<input
				class="rounded-md border border-slate-400 px-2 py-0.5"
				type="password"
				placeholder="Пароль"
				ref="passwordInput"
				v-model="password"
				@blur="isPasswordDirty = true"
			/>

			<div class="text-sm text-red-400" v-if="isAuthError">
				Неправильный логин или пароль.
			</div>

			<button class="rounded-md bg-emerald-200 py-0.5">Войти</button>

			<RouterLink to="signup" class="place-self-center text-sm text-cyan-700">
				Зарегистрироваться
			</RouterLink>
		</form>
	</div>
</template>
