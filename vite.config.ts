import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

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

	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		}
	},

	server: {
		hmr: true,
		open: true
	}
})
