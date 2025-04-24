/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, type MessageArgsProps } from 'antd'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { isEqual } from 'lodash-es'

declare type CommonSuccessResponse = {
	code: 200
	msg: string
}

/**
 * 回调参数
 */
export declare type UseAxiosCallbackParams<Response = any, Payload = any, Query = any> = {
	responseData?: CommonSuccessResponse & Response
	payload: Payload
	params: Query
}

// 类型扩展
type RunOverload<Payload = any, Query = any> = {
	/**
	 * 基础无参调用
	 */
	(): void

	/**
	 * @param url 请求地址
	 * @param config 请求配置
	 */
	(url: string, config?: AxiosRequestConfig<Payload> & { params?: Query }): void

	/**
	 * @param config 配置项
	 */
	(config: AxiosRequestConfig<Payload> & { params?: Query }): void

	/**
	 * @param payload 请求体
	 * @param query 请求参数
	 */
	// (payload: Payload, query?: Query): void
}

/**
 * axios 请求配置
 */
export declare type AxiosOptions<Response = any, Payload = any, Query = any> = {
	/**
	 * 立即执行
	 */
	immediate?: boolean
	/**
	 * 依赖变化立即执行
	 * @todo
	 */
	deps?: any[]
	/**
	 * 接口结束时回调
	 * @param params 参数
	 * @returns
	 */
	onFinish?: (params: UseAxiosCallbackParams<Response, Payload, Query>) => void
	/**
	 * 接口访问成功时回调
	 * @param params 参数
	 * @returns
	 */
	onSuccess?: (params: UseAxiosCallbackParams<Response, Payload, Query>) => void
	/**
	 * 接口返回失败时回调
	 * @param params 参数
	 * @returns
	 */
	onFailed?: (params: UseAxiosCallbackParams<Response, Payload, Query>) => void
	/**
	 * 接口error
	 * @param params
	 * @returns
	 */
	onError?: (params: { error: any } & Omit<UseAxiosCallbackParams<Response, Payload, Query>, 'responseData'>) => void
	/**
	 * 成功消息
	 */
	successMsg?: boolean | MessageArgsProps
	/**
	 * 失败消息
	 */
	failedMsg?: boolean | MessageArgsProps
	/**
	 * error消息
	 */
	errorMsg?: boolean | MessageArgsProps
	/**
	 * 结束消息
	 */
	finishMsg?: boolean | MessageArgsProps
}

const apiPrefix = '/api'

const url = import.meta.env.DEV ? '' : import.meta.env.VITE_APP_BASE_API

const baseUrl = url + apiPrefix

console.warn(import.meta.env, baseUrl)

/**
 * axios 服务实例，用于发送 HTTP 请求
 */
const service = axios.create({
	baseURL: baseUrl
	// baseURL: '/api'
})

/**
 * 存储用户认证 token
 */
let token: string | null = null

/**
 * axios service request 拦截器
 * 用于在请求发送前添加认证 token
 */
service.interceptors.request.use((request) => {
	const whitePath = ['/user/login']

	const { url } = request

	if (!token) {
		token = localStorage.getItem('token')
	}

	if (url) {
		if (!whitePath.includes(url)) {
			request.headers.Authorization = `Bearer ${token}`
		}
	}

	return request
})

/**
 * axios service response 拦截器
 * 用于处理响应数据
 */
service.interceptors.response.use((response) => {
	return response
})

/**
 * 自定义的 axios hook，用于发送 HTTP 请求并管理加载状态
 * @param url 请求的 URL
 * @param requestConfig 请求配置
 * @param options 请求选项，包括回调函数等
 * @returns 返回加载状态和运行函数
 */
export const useAxios = <Response = any, Payload = any, Query = any>(
	url: string,
	requestConfig?: AxiosRequestConfig<Payload>,
	options?: AxiosOptions<Response, Payload, Query>
) => {
	const { message } = App.useApp()

	const [isLoading, setLoading] = useState(false)
	const { deps, immediate, ...restOptions } = options || {}
	const isMounted = useRef(true)
	const prevDeps = useRef(deps)
	const abortControllerRef = useRef<AbortController | null>(null)

	const run: RunOverload<Partial<Payload>, Partial<Query>> = useCallback(
		(...args: any[]) => {
			// 取消之前的请求
			if (abortControllerRef.current) {
				abortControllerRef.current.abort()
			}

			const controller = new AbortController()
			abortControllerRef.current = controller
			setLoading(true)

			let _requestConfig: AxiosRequestConfig<Payload> = {
				url,
				method: 'get',
				...requestConfig,
				signal: controller.signal
			}

			if (args && args.length > 0) {
				const [param1, param2] = args

				if (param1) {
					if (typeof param1 === 'string') {
						_requestConfig.url = param1

						if (param2) {
							_requestConfig = { ..._requestConfig, ...param2 }
						}
					} else if (typeof param1 === 'object') {
						_requestConfig = { ..._requestConfig, ...param1 }
					}
				}
			}

			service<Response & CommonSuccessResponse, AxiosResponse<Response & CommonSuccessResponse, Payload>, Payload>(
				_requestConfig
			)
				.then((res) => {
					if (restOptions.onSuccess) {
						restOptions.onSuccess({
							responseData: res.data,
							params: _requestConfig.params,
							payload: _requestConfig.data as Payload
						})
					}

					if (res.data.code === 200) {
						if (restOptions.successMsg) {
							if (typeof restOptions.successMsg === 'boolean') {
								message.success('请求成功')
							} else {
								message.open(restOptions.successMsg)
							}
						}
					} else {
						if (restOptions.failedMsg) {
							if (typeof restOptions.failedMsg === 'boolean') {
								message.error('请求失败')
							} else {
								message.open(restOptions.failedMsg)
							}
						}
					}
				})
				.catch((error) => {
					if (restOptions.onError) {
						restOptions.onError({
							error,
							params: _requestConfig.params,
							payload: _requestConfig.data as Payload
						})
						if (restOptions.errorMsg) {
							if (typeof restOptions.errorMsg === 'boolean') {
								message.error('请求失败')
							} else {
								message.open(restOptions.errorMsg)
							}
						}
					}
				})
				.finally(() => {
					setLoading(false)
					if (restOptions.onFinish) {
						restOptions.onFinish({
							responseData: undefined,
							params: _requestConfig.params,
							payload: _requestConfig.data as Payload
						})
					}
					if (restOptions.finishMsg) {
						if (typeof restOptions.finishMsg === 'boolean') {
							message.info('请求结束')
						} else {
							message.open(restOptions.finishMsg)
						}
					}
				})

			return () => controller.abort()
		},
		[url, requestConfig, restOptions]
	)

	useEffect(() => {
		return () => {
			// 组件卸载时取消请求
			if (abortControllerRef.current) {
				abortControllerRef.current.abort()
			}
		}
	}, [])

	useDeepCompareEffect(() => {
		const runOnMounted = immediate && isMounted.current
		const depsChanged = !isEqual(prevDeps.current, deps)

		if (runOnMounted || depsChanged) {
			const abort = run()
			prevDeps.current = deps
			return abort
		}

		isMounted.current = false
		return undefined
	}, [immediate, deps])

	return { isLoading, run }
}
