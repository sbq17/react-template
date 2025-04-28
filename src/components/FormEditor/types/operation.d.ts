/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BtnProps } from '@/components/BtnItem/type'
import type { FormInstance } from 'antd'
import type { BaseColumn } from './column'

declare type OperationParams<T> = {
	form: FormInstance<T>
	formData: Partial<T>
}

declare type FormBtnProps<T = any> = Omit<BtnProps, 'show' | 'disabled' | 'onClick'> & {
	show?: boolean | ((params: OperationParams<T> & { btn: FormBtnProps<T> }) => boolean)
	disabled?: boolean | ((params: OperationParams<T> & { btn: FormBtnProps<T> }) => boolean)
	onClick?: (
		params: OperationParams<T> & { btn: FormBtnProps<T>; event: React.MouseEvent<HTMLElement, MouseEvent> }
	) => void
}

export declare type FormOperation<T> = {
	submitBtn?:
		| boolean
		| Omit<FormBtnProps<T>, 'onClick'>
		| ((params: OperationParams<T>) => boolean | Omit<FormBtnProps<T>, 'onClick'>)
	submitLabel: FormBtnProps['label']
	cancelBtn?:
		| boolean
		| Omit<FormBtnProps<T>, 'onClick'>
		| ((params: OperationParams<T>) => boolean | Omit<FormBtnProps<T>, 'onClick'>)
	cancelLabel: FormBtnProps['label']
	operations?: FormBtnProps<T>[] | ((params: OperationParams<T>) => FormBtnProps<T>[])
	operationPosition?: 'start' | 'center' | 'end'
	renderOperation?: React.ReactNode | ((params: OperationParams<T>) => React.ReactNode)
	operationItem?: Omit<BaseColumn<T>, 'name' | 'show' | 'colProps'> & {
		show?: boolean | ((params: OperationParams<T>) => boolean)
	}
}
