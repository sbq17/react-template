/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColProps, FormItemProps, FormProps } from 'antd'
import { Col, Form, Row, Input, Select, Checkbox } from 'antd'
import type { FormBtnProps, FormColumn, FormEditorProps, FormOperation, OperationParams } from './types'
import { EMPTY_VALUE_LIST } from '@/constant'
import type { BtnProps } from '../BtnItem/type'
import BtnItem from '../BtnItem'

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
			props.onSubmit({ values, form })
		}
	}

	const onFinisFailed: FormProps<T>['onFinishFailed'] = (errorInfo) => {
		console.log(errorInfo)
		// 如果父组件传递了 onFinishFailed 函数，则调用它
		if (props.onFinishFailed) {
			props.onFinishFailed({ data: props.data as Partial<T>, form, errorInfo })
		}
	}

	const onReset: FormProps<T>['onReset'] = () => {
		if (props.onReset) {
			props.onReset({ form, data: props.data as Partial<T> })
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
			props.onFormChange({ allValues, changeValues, form })
		}
	}

	// 使用 useMemo 优化 rowProps，避免不必要的重新计算
	const rowProps = useMemo<FormEditorProps['rowProps']>(() => {
		const rowProps = props.rowProps
		return {
			...rowProps, // 合并父组件传递的 rowProps
			gutter: rowProps?.gutter === void 0 ? 8 : rowProps.gutter // 默认间距为 8
		}
	}, [props.rowProps])

	// 使用 useMemo 优化 colProps，避免不必要的重新计算
	const colProps = useMemo<ColProps>(() => {
		if (typeof props.colProps === 'number') {
			return { span: props.colProps } // 如果 colProps 是数字，则直接作为 span 值
		} else {
			const colProps = props.colProps
			return { ...colProps, span: colProps?.span === void 0 ? 24 : colProps.span } // 否则合并默认 span 值和父组件传递的 colProps
		}
	}, [props.colProps])

	const itemLabelCol = useMemo<FormItemProps<T>['labelCol']>(() => {
		if (typeof props.itemLabelCol === 'number') {
			return { span: props.itemLabelCol }
		} else {
			const { span, ...rest } = props.itemLabelCol || {}
			return {
				span: span || 8,
				...rest
			}
		}
	}, [props.itemLabelCol])

	const itemContentCol = useMemo<FormItemProps<T>['wrapperCol']>(() => {
		if (typeof props.itemWrapperCol === 'number') {
			return { span: props.itemWrapperCol }
		} else {
			return props.itemWrapperCol
		}
	}, [props.itemWrapperCol])

	/**
	 * 根据表单项的类型渲染对应的组件
	 * @param {FormColumn<T>} item 表单项配置
	 * @returns {JSX.Element} 返回渲染的组件
	 */
	const renderComponent = (item: FormColumn<T>) => {
		const placeholder = typeof item.label === 'string' ? item.label : ''

		switch (item.type) {
			case 'input':
				return <Input placeholder={`请输入${placeholder}`} {...item.props} /> // 渲染输入框
			case 'inputPassword':
				return <Input.Password placeholder={`请输入${placeholder}`} visibilityToggle={true} {...item.props} /> // 渲染密码框
			case 'inputTextarea':
				return <Input.TextArea placeholder={`请输入${placeholder}`} {...item.props} /> // 渲染文本域
			case 'inputSearch':
				return <Input.Search placeholder={`请输入${placeholder}`} {...item.props} /> // 渲染搜索框
			case 'inputOtp':
				return <Input.OTP {...item.props} /> // 渲染 OTP 输入框
			case 'select':
				return (
					<Select placeholder={`请选择${placeholder}`} {...item.props}>
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

	const pickItemLayout = (
		params: Pick<FormColumn<T>, 'labelCol' | 'wrapperCol'>
	): Pick<FormItemProps<T>, 'labelCol' | 'wrapperCol'> => {
		const { labelCol, wrapperCol } = params

		return {
			labelCol:
				typeof labelCol === 'object'
					? Object.assign(itemLabelCol || {}, labelCol)
					: Object.assign(itemLabelCol || {}, { span: labelCol || itemLabelCol?.span }),
			wrapperCol:
				typeof wrapperCol === 'object'
					? Object.assign(itemContentCol || {}, wrapperCol)
					: Object.assign(itemContentCol || {}, { span: wrapperCol || itemContentCol?.span })
		}
	}

	/**
	 * 渲染表单项
	 * @param {FormColumn<T>} item 表单项配置
	 * @returns {JSX.Element} 返回渲染的表单项
	 */
	const renderFormItem = (item: FormColumn<T>) => {
		const { children, labelPlaceholder, labelCol, wrapperCol, ...rest } = item

		// 判断是否需要显示 labelPlaceholder
		const hasLabelPlaceholder = EMPTY_VALUE_LIST.includes(labelPlaceholder) ? true : labelPlaceholder

		const formItemLayout = pickItemLayout({ labelCol, wrapperCol })

		// 表单项的配置
		const formItemProps: FormItemProps<T> = {
			colon: false, // 不显示冒号
			...formItemLayout,
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

	const pickBtnProps = (btn: BtnProps, config?: FormOperation<T>['cancelBtn']) => {
		if (config !== void 0) {
			if (typeof config === 'function') {
				//
				const customBtn = config({ form, formData: props.data || {} })

				if (typeof customBtn === 'object') {
					return Object.assign(btn, customBtn)
				} else {
					btn.show = customBtn
					return btn
				}
			} else {
				//
				if (typeof config === 'object') {
					return Object.assign(btn, config)
				} else {
					btn.show = config
					return btn
				}
			}
		} else {
			return btn
		}
	}

	const cancelBtn = useMemo(() => {
		return pickBtnProps(
			{
				label: props.cancelLabel !== void 0 ? props.cancelLabel : '取消',
				danger: true,
				type: 'primary',
				htmlType: 'reset',
				show: false
			},
			props.cancelBtn
		)
	}, [props.cancelBtn, props.cancelLabel])

	const submitBtn = useMemo(() => {
		return pickBtnProps(
			{
				label: props.submitLabel !== void 0 ? props.submitLabel : '确认',
				type: 'primary',
				htmlType: 'submit'
			},
			props.submitBtn
		)
	}, [props.submitBtn, props.submitLabel])

	const renderBtnItem = (btnItem: BtnProps) => {
		return <BtnItem key={btnItem.label as string} {...btnItem}></BtnItem>
	}

	const renderFormOperation = () => {
		const operationParams: OperationParams<T> = {
			form,
			formData: props.data || {}
		}

		const { show, key, ...rest } = props.operationItem || {}
		const _show = typeof show === 'function' ? show(operationParams) : show === void 0 ? true : show

		if (_show) {
			const { labelPlaceholder, labelCol, wrapperCol, ...otherProps } = rest

			const hasLabelPlaceholder = EMPTY_VALUE_LIST.includes(labelPlaceholder) ? true : labelPlaceholder

			const operationLayout = pickItemLayout({ labelCol, wrapperCol })

			const formItemProps: FormItemProps<T> = {
				...operationLayout,
				...otherProps,
				colon: false,
				label: hasLabelPlaceholder ? <span></span> : null
			}

			if (EMPTY_VALUE_LIST.includes(formItemProps.children)) {
				if (EMPTY_VALUE_LIST.includes(props.renderOperation)) {
					//
					const customBtns: FormBtnProps[] =
						typeof props.operations === 'function' ? props.operations(operationParams) : props.operations || []

					const { operationPosition = 'end' } = props

					const customBtnNodes = customBtns.map((btn) => {
						const { onClick, show, disabled, ...rest } = btn
						const _show = typeof show === 'function' ? show({ ...operationParams, btn }) : show === void 0 ? true : show
						const _disabled =
							typeof disabled === 'function'
								? disabled({ ...operationParams, btn })
								: disabled === void 0
									? false
									: disabled

						return _show
							? renderBtnItem({
									...rest,
									disabled: _disabled,
									onClick: (params) => {
										if (onClick) {
											onClick({ ...operationParams, btn, ...params })
										}
									}
								})
							: null
					})

					formItemProps.children = (
						<div>
							{operationPosition === 'start' ? customBtnNodes : null}
							{renderBtnItem(cancelBtn)}
							{operationPosition === 'center' ? customBtnNodes : null}
							{renderBtnItem(submitBtn)}
							{operationPosition === 'end' ? customBtnNodes : null}
						</div>
					)
				} else {
					formItemProps.children =
						typeof props.renderOperation === 'function' ? props.renderOperation(operationParams) : props.renderOperation
				}
			}

			return <Form.Item {...formItemProps} key={key || '__form_operation_item'}></Form.Item>
		} else {
			return null
		}
	}

	return (
		<div className="form_wrapper">
			<Form
				form={form}
				{...props.formProps}
				onFinish={onSubmit}
				onReset={onReset}
				onValuesChange={onFormChange}
				onFinishFailed={onFinisFailed}
			>
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
				{renderFormOperation()}
			</Form>
		</div>
	)
}

export default FormEditor
