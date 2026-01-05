import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from '@tailwindcss/vite' // 导入 Tailwind Vite 插件

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			tsDecorators: true
		}),
		tailwindcss(),
		AutoImport({
			imports: [
				'react',
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
			dirs: ['./src/components/**', './src/api/**', './src/hook/**'],
			// resolvers: [AntdResolver()],
			eslintrc: { enabled: true, filepath: './.eslintrc-auto-import.js' }
		})
	],

	// 最新的路径别名配置方式 (Vite 5+)
	resolve: {
		alias: {
			'@': './src'
		}
	},

	server: {
		hmr: true,
		open: true
	}
})

