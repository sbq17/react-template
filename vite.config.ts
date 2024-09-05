import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import AntdResolver from 'unplugin-auto-import-antd'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// 自动导入import
		AutoImport({
			imports: [
				'react',
				'ahooks',
				{
					'lodash-es': [
						'isEmpty',
						'find',
						'findIndex',
						'reduce',
						'sortBy',
						'cloneDeep',
						'round',
						'orderBy',
						'map',
						'forEach',
						'filter',
						'round',
						'debounce'
					]
				},
				{
					from: 'react-router-dom',
					imports: ['RouteProps', 'RouteObject'],
					type: true
				},
				{
					from: './src/types/route.d.ts',
					imports: ['CustomRouteProp'],
					type: true
				}
			],
			dts: 'types/auto-imports.d.ts',
			dirs: ['./src/components/**'],
			resolvers: [AntdResolver()],
			eslintrc: { enabled: true, filepath: './.eslintrc-auto-import.js' }
		}),
		// 全局导入icons
		createSvgIconsPlugin({
			iconDirs: [fileURLToPath(new URL('./src/icons', import.meta.url))],
			symbolId: 'icon-[dir]-[name]'
		})
	],
	server: {
		open: true,
		hmr: true,
		port: 2638
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
			// api: fileURLToPath(new URL('./src/api', import.meta.url)),
			// image: fileURLToPath(new URL('./src/image', import.meta.url)),
			// components: fileURLToPath(new URL('./src/components', import.meta.url)),
			// constant: fileURLToPath(new URL('./src/constant', import.meta.url)),
			// hook: fileURLToPath(new URL('./src/hook', import.meta.url)),
			// packages: fileURLToPath(new URL('./src/packages', import.meta.url)),
			// service: fileURLToPath(new URL('./src/service', import.meta.url)),
			// stores: fileURLToPath(new URL('./src/stores', import.meta.url)),
			// types: fileURLToPath(new URL('./src/types', import.meta.url)),
			// util: fileURLToPath(new URL('./src/util', import.meta.url)),
			// views: fileURLToPath(new URL('./src/views', import.meta.url)),
		}
	}
})

