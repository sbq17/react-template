/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColProps, FormItemProps, InputProps, SelectProps, CheckboxProps } from 'antd'
import type { PasswordProps, SearchProps, TextAreaProps } from 'antd/es/input'
import type { OTPProps } from 'antd/es/input/OTP'

type ColumnParams<T> = {
	formData?: Partial<T>
	index: number
}

type CustomColumnProps<T> = {
	show?: boolean | ((params: ColumnParams<T>) => boolean)
	key?: string
	colProps?: number | ColProps
	type?: never // 确保基础类型没有type属性
	labelPlaceholder?: boolean
}

type InputColumn<T> = {
	type: 'input'
	props?: InputProps
} & FormItemProps<T> &
	Omit<CustomColumnProps<T>, 'type'>

type InputPwdColumn<T> = {
	type: 'inputPassword'
	props?: InputProps & PasswordProps
} & FormItemProps<T> &
	Omit<CustomColumnProps<T>, 'type'>

type InputTextAreaColumn<T> = {
	type: 'inputTextarea'
	props?: InputProps & TextAreaProps
} & FormItemProps<T> &
	Omit<CustomColumnProps<T>, 'type'>

type InputSearch<T> = {
	type: 'inputSearch'
	props?: InputProps & SearchProps
} & FormItemProps<T> &
	Omit<CustomColumnProps<T>, 'type'>

type InputOtp<T> = {
	type: 'inputOtp'
	props?: InputProps & OTPProps
} & FormItemProps<T> &
	Omit<CustomColumnProps<T>, 'type'>

type SelectColumn<T> = {
	type: 'select'
	props?: SelectProps
	options?: Array<{ label: string; value: any }>
} & FormItemProps<T> &
	Omit<CustomColumnProps<T>, 'type'>

type CheckboxColumn<T> = {
	type: 'checkbox'
	props?: CheckboxProps
} & FormItemProps<T> &
	Omit<CustomColumnProps<T>, 'type'>

type BaseColumn<T> = FormItemProps<T> & {
	labelCol?: number | FormItemProps['labelCol']
	wrapperCol?: number | FormItemProps['wrapperCol']
} & CustomColumnProps<T>

export declare type FormColumn<T = any> =
	| InputColumn<T>
	| InputPwdColumn<T>
	| InputTextAreaColumn<T>
	| InputSearch<T>
	| InputOtp<T>
	| SelectColumn<T>
	| CheckboxColumn<T>
	| BaseColumn<T>
