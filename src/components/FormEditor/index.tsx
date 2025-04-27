import { Col, ColProps, Form, FormItemProps, FormProps, Row } from 'antd'
import { FormColumn, FormEditorProps } from './types'
import { EMPTY_VALUE_LIST } from '@/constant'

/**
 * 表单编辑器组件，用于动态生成表单
 * @template T 表单数据的类型，默认为任意对象
 * @param {FormEditorProps<T>} props 组件的属性
 * @returns {JSX.Element} 返回表单编辑器的 JSX 元素
 */
const FormEditor = <T extends object = any>(props: FormEditorProps<T>) => {
	// 使用 antd 的 Form.useForm 创建表单实例
	const [form] = Form.useForm<T>()

	/**
	 * 表单提交事件处理函数
	 * @param {T} values 表单提交的值
	 */
	const onSubmit: FormProps<T>['onFinish'] = (values) => {
		console.log(values)
		// 如果父组件传递了 onSubmit 函数，则调用它
		if (props.onSubmit) {
			props.onSubmit(values)
		}
	}

	/**
	 * 表单值变化事件处理函数
	 * @param {Partial<T>} changeValues 变化的值
	 * @param {T} allValues 当前表单的所有值
	 */
	const onFormChange: FormProps<T>['onValuesChange'] = (changeValues, allValues) => {
		// 如果父组件传递了 onFormChange 函数，则调用它
		if (props.onFormChange) {
			props.onFormChange({ allValues, changeValues })
		}
	}

	// 使用 useMemo 优化 rowProps，避免不必要的重新计算
	const rowProps = useMemo<FormEditorProps['rowProps']>(() => {
		return {
			gutter: 8, // 默认间距为 8
			...props.rowProps // 合并父组件传递的 rowProps
		}
	}, [props.rowProps])

	// 使用 useMemo 优化 colProps，避免不必要的重新计算
	const colProps = useMemo<ColProps>(() => {
		if (typeof props.colProps === 'number') {
			return { span: props.colProps } // 如果 colProps 是数字，则直接作为 span 值
		} else {
			return { span: 24, ...props.colProps } // 否则合并默认 span 值和父组件传递的 colProps
		}
	}, [props.colProps])

	/**
	 * 根据表单项的类型渲染对应的组件
	 * @param {FormColumn<T>} item 表单项配置
	 * @returns {JSX.Element} 返回渲染的组件
	 */
	const renderComponent = (item: FormColumn<T>) => {
		switch (item.type) {
			case 'input':
				return <Input {...item.props} /> // 渲染输入框
			case 'inputPassword':
				return <Input.Password {...item.props} /> // 渲染密码框
			case 'inputTextarea':
				return <Input.TextArea {...item.props} /> // 渲染文本域
			case 'inputSearch':
				return <Input.Search {...item.props} /> // 渲染搜索框
			case 'inputOtp':
				return <Input.OTP {...item.props} /> // 渲染 OTP 输入框
			case 'select':
				return (
					<Select {...item.props}>
						{item.options?.map((option) => (
							<Select.Option key={option.value} value={option.value}>
								{option.label}
							</Select.Option>
						))}
					</Select>
				) // 渲染选择框
			case 'checkbox':
				return <Checkbox {...item.props} /> // 渲染复选框
			default:
				return <Input {...(item as any).props} /> // 默认渲染输入框
		}
	}

	/**
	 * 渲染表单项
	 * @param {FormColumn<T>} item 表单项配置
	 * @returns {JSX.Element} 返回渲染的表单项
	 */
	const renderFormItem = (item: FormColumn<T>) => {
		const { children, labelPlaceholder, ...rest } = item

		// 判断是否需要显示 labelPlaceholder
		const hasLabelPlaceholder = EMPTY_VALUE_LIST.includes(labelPlaceholder) ? true : labelPlaceholder

		// 表单项的配置
		const formItemProps: FormItemProps<T> = {
			colon: false, // 不显示冒号
			labelCol: { span: 8 }, // label 的布局
			wrapperCol: { span: 16 }, // 表单项的布局
			...rest, // 合并其他配置
			label: hasLabelPlaceholder ? (
				EMPTY_VALUE_LIST.includes(rest.label) ? (
					<span></span> // 如果 label 为空，则渲染空 span
				) : (
					rest.label
				)
			) : (
				rest.label
			) // 根据条件渲染 label
		}

		return <Form.Item {...formItemProps}>{children ? children : renderComponent(rest)}</Form.Item>
	}

	return (
		<div className="form_wrapper">
			<Form form={form} {...props.formProps} onFinish={onSubmit} onValuesChange={onFormChange}>
				<Row {...rowProps}>
					{(props.columns || []).map((item, i) => {
						const { show, key, colProps: itemColProps, ...rest } = item

						// 判断是否显示当前表单项
						const _show =
							typeof show === 'function'
								? show({ formData: props.data, index: i }) // 如果 show 是函数，则动态计算
								: show === void 0
									? true // 如果 show 未定义，则默认显示
									: show

						if (_show) {
							// 合并 colProps 和 itemColProps
							const _col_props =
								itemColProps !== void 0
									? typeof itemColProps === 'number'
										? { ...colProps, span: itemColProps } // 如果 itemColProps 是数字，则作为 span 值
										: { ...colProps, ...itemColProps } // 否则合并 colProps 和 itemColProps
									: colProps

							return (
								<Col {..._col_props} key={key || (item.name as string) || i}>
									{renderFormItem(rest)}
								</Col>
							)
						} else {
							return null // 如果不显示，则返回 null
						}
					})}
				</Row>
			</Form>
		</div>
	)
}

export default FormEditor
