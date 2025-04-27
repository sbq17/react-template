/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColProps, FormProps, RowProps } from 'antd'
import type { FormColumn } from './column'
import type { BtnProps } from '@/components/BtnItem/type'

export interface FormEditorProps<T = any> {
	/**
	 * 表单数据
	 */
	data?: T
	/**
	 * 表单列表
	 */
	columns?: FormColumn<T>[]
	/**
	 * 表单配置
	 */
	formProps?: FormProps<T>
	/**
	 * 表单提交回调函数
	 */
	onSubmit?: FormProps<T>['onFinish']
	/**
	 * 表单值变化回调函数
	 */
	onFormChange?: (params: { changeValues: T; allValues: T }) => void
	// onFormChange?: Dispatch<SetStateAction<T>>
	/**
	 * 表单呈现模式
	 */
	mode?: 'horizontal' | 'vertical'
	/**
	 * 操作按钮
	 */
	operations?: BtnProps[]
	/**
	 * 表单行属性
	 */
	rowProps?: RowProps
	/**
	 * 表单列布局属性
	 */
	colProps?: number | ColProps
}
