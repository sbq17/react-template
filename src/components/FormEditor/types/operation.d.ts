import type { BtnProps } from '@/components/BtnItem/type'

export declare type OperationProps = {
	/**
	 * 是否显示提交按钮
	 * @default true
	 */
	showSubmit?: boolean

	/**
	 * 提交按钮的配置属性
	 */
	submitProps?: BtnProps

	/**
	 * 是否显示取消按钮
	 * @default false
	 */
	showCancel?: boolean

	/**
	 * 取消按钮的配置属性
	 */
	cancelProps?: BtnProps
}
