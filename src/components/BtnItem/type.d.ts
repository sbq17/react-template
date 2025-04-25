import type { ButtonProps } from 'antd'
import type { ReactNode } from 'react'

export declare type BtnParams = BtnProps

export interface BtnProps extends ButtonProps {
	/**
	 * 是否展示
	 */
	show?: boolean | ((params: BtnParams) => boolean)
	/**
	 * 重写禁用
	 */
	disabled?: boolean | ((params: BtnParams) => boolean)
	/**
	 * 按钮文字
	 */
	label?: ReactNode
	/**
	 * click 事件
	 */
	onClick?: (parms: { event: React.MouseEvent<HTMLElement, MouseEvent>; params: BtnParams }) => void
}
