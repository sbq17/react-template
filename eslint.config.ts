/* eslint-disable @typescript-eslint/no-explicit-any */
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import pluginReact from 'eslint-plugin-react'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'
import autoImport from './.eslintrc-auto-import.js'

export default defineConfig([
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		plugins: {
			'react-hooks': reactHooks as any,
			'react-refresh': reactRefresh
		},
		languageOptions: { globals: { ...globals.browser, ...autoImport.globals } },
		rules: {
			'prefer-const': [
				'error',
				{
					destructuring: 'any',
					ignoreReadBeforeAssign: false
				}
			],
			// 允许以 _ 开头的变量和参数
			'@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
			// '@typescript-eslint/no-unused-vars': 'error',
			// '@typescript-eslint/explicit-module-boundary-types': 'warn',
			// 提示未导入的类型
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					disallowTypeAnnotations: true,
					fixStyle: 'separate-type-imports',
					prefer: 'type-imports'
				}
			]
		}
	},
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	{ files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
	{ files: ['**/*.jsonc'], plugins: { json }, language: 'json/jsonc', extends: ['json/recommended'] },
	{ files: ['**/*.json5'], plugins: { json }, language: 'json/json5', extends: ['json/recommended'] },
	{ files: ['**/*.md'], plugins: { markdown }, language: 'markdown/commonmark', extends: ['markdown/recommended'] },
	{ files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] }
])

