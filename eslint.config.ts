import css from '@eslint/css'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
	globalIgnores(['src/assets/', 'src/vite-env.d.ts']),
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: { globals: globals.browser },
	},
	tseslint.configs.recommended,
	...pluginVue.configs['flat/essential'].map((config) => ({
		...config,
		files: ['**/*.vue'],
	})),
	{
		files: ['**/*.vue'],
		languageOptions: { parserOptions: { parser: tseslint.parser } },
	},
	{
		files: ['**/*.css'],
		plugins: { css },
		language: 'css/css',
		rules: {
			'css/no-duplicate-imports': 'error',
		},
	},
])
