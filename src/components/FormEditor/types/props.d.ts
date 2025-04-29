/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColProps, FormItemProps, FormProps, RowProps } from 'antd'
import type { FormColumn } from './column'
import type { FormInstance } from 'antd/lib'
import type { FormOperation } from './operation'

export interface FormEditorProps<T = any> extends FormOperation<T> {
	/**
	 * 表单数据
	 */
	data?: Partial<T>
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
	onSubmit?: (params: { values: Partial<T>; form: FormInstance<T> }) => void
	/**
	 * 表单值变化回调函数
	 */
	onFormChange?: (params: { form: FormInstance<T>; changeValues: Partial<T>; allValues: T }) => void
	/**
	 * 表单重置
	 * @param params 参数
	 * @returns
	 */
	onReset?: (params: { form: FormInstance<T>; data: Partial<T> }) => void
	/**
	 * 表单提交失败回调函数
	 * @param params 参数
	 * @returns
	 */
	onFinishFailed?: (params: {
		data: Partial<T>
		form: FormInstance<T>
		errorInfo: Parameters<FormProps<T>['onFinishFailed']>[0]
	}) => void
	/**
	 * 表单呈现模式
	 */
	mode?: 'horizontal' | 'vertical'
	/**
	 * 表单行属性
	 */
	rowProps?: RowProps
	/**
	 * 表单列布局属性
	 */
	colProps?: number | ColProps
	/**
	 * 表单标签属性
	 */
	itemLabelCol?: number | FormItemProps<T>['labelCol']
	/**
	 * 表单内容属性
	 */
	itemWrapperCol?: number | FormItemProps<T>['wrapperCol']
}
