import type { ColProps, FormItemProps } from 'antd'

/**
 * 表单列参数
 */
type ColumnParams<T> = {
	/**
	 * 表单数据
	 */
	formData?: Partial<T>
	/**
	 * 索引
	 */
	index: number
}

type CustomColumnProps<T> = {
	/**
	 * 是否展示
	 */
	show?: boolean | ((params: ColumnParams<T>) => boolean)
	/**
	 * 列key
	 */
	key?: string
	/**
	 * col布局属性
	 */
	colProps?: number | ColProps
}

export declare type FormColumn<T> = FormItemProps<T> & CustomColumnProps<T>
