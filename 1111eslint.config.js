import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		languageOptions: { globals: globals.browser },
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		ignores: ['dist/**/*', 'node_modules/**/*']
	},
	{
		// 添加 Prettier 配置
		files: ['**/*.{js,ts,tsx,jsx}'],
		rules: {
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
	prettier // 确保将 Prettier 配置放在最后
]

