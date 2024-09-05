/// <reference types="vite/client" />

interface ImportMetaEnv {
	/**
	 * 接口请求地址
	 */
	readonly VITE_APP_BASE_API: string
	/**
	 * webSocket地址
	 */
	readonly VITE_WS_URL: string
	/**
	 * 项目缓存的storage key
	 */
	readonly VITE_APP_CACHE_KEY: string
}

