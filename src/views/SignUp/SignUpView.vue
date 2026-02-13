<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const userName = ref('')
const password = ref('')
const email = ref('')

const isUserNameDirty = ref(false)
const isPasswordDirty = ref(false)
const isEmailDirty = ref(false)

const errors = ref<Partial<Record<'name' | 'password' | 'email', string>>>({})

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
	email,
	(email) => {
		if (!email) {
			errors.value.email = 'Обязательное поле'
			return
		}

		if (email.length < 6) {
			errors.value.email = 'Минимальная длина - 6 символов'
			return
		}

		if (email.length > 35) {
			errors.value.email = 'Максимальная длина - 35 символов'
			return
		}

		if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
			errors.value.email = 'Неправильный формат электронной почты'
			return
		}

		errors.value.email = undefined
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
	isEmailDirty.value = true
	isPasswordDirty.value = true

	if (Object.values(errors).filter(Boolean)) {
		return
	}

	authStore
		.signUp({
			name: userName.value,
			password: password.value,
			email: email.value,
		})
		.then(() => router.push('/'))
}
</script>

<template>
	<div class="grid h-full w-full place-content-center gap-4">
		<h1 class="text-3xl font-bold">Регистрация</h1>

		<form class="flex w-80 flex-col gap-2" @submit.prevent="onFormSubmit">
			<input
				class="field"
				placeholder="Логин"
				v-model.trim="userName"
				@blur="isUserNameDirty = true"
			/>

			<div class="error" v-if="errors.name && isUserNameDirty">
				{{ errors.name }}
			</div>

			<input
				class="field"
				type="email"
				placeholder="Эл. почта"
				v-model.trim="email"
				@blur="isEmailDirty = true"
			/>

			<div class="error" v-if="errors.email && isEmailDirty">
				{{ errors.email }}
			</div>

			<input
				class="field"
				type="password"
				placeholder="Пароль"
				v-model="password"
				@blur="isPasswordDirty = true"
			/>

			<div class="error" v-if="errors.password && isPasswordDirty">
				{{ errors.password }}
			</div>

			<button class="cursor-pointer rounded-md bg-emerald-200 py-0.5">
				Зарегистрироваться
			</button>

			<RouterLink to="login" class="place-self-center text-sm text-cyan-700">
				Вход
			</RouterLink>
		</form>
	</div>
</template>

<style scoped>
@reference "@/style.css";

.field {
	@apply rounded-md border border-slate-400 px-2 py-0.5;
}

.error {
	@apply flex flex-col gap-1 bg-red-50 px-2 py-1 leading-5 text-red-950;
}
</style>
