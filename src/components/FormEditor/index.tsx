import { Col, ColProps, Form, FormItemProps, FormProps, Row } from 'antd'
import { FormColumn, FormEditorProps } from './types'
import { EMPTY_VALUE_LIST } from '@/constant'

const FormEditor = <T extends object = any>(props: FormEditorProps<T>) => {
	const [form] = Form.useForm<T>()

	const onSubmit: FormProps<T>['onFinish'] = (values) => {
		console.log(values)
	}

	const onFormChange: FormProps<T>['onValuesChange'] = (changeValues, allValues) => {
		console.log(changeValues, allValues, props.onFormChange)
		if (props.onFormChange) {
			props.onFormChange(allValues)
		}
	}

	const rowProps = useMemo<FormEditorProps['rowProps']>(() => {
		return {
			gutter: 8,
			...props.rowProps
		}
	}, [props.rowProps])

	const colProps = useMemo<ColProps>(() => {
		if (typeof props.colProps === 'number') {
			return { span: props.colProps }
		} else {
			return { span: 24, ...props.colProps }
		}
	}, [props.colProps])

	const renderComponent = (item: FormColumn<T>) => {
		// if (!item.type) {
		// 	return null
		// }

		switch (item.type) {
			case 'input':
				return <Input {...item.props} />
			case 'inputPassword':
				return <Input.Password {...item.props} />
			case 'inputTextarea':
				return <Input.TextArea {...item.props} />
			case 'inputSearch':
				return <Input.Search {...item.props} />
			case 'inputOtp':
				return <Input.OTP {...item.props} />
			case 'select':
				return (
					<Select {...item.props}>
						{item.options?.map((option) => (
							<Select.Option key={option.value} value={option.value}>
								{option.label}
							</Select.Option>
						))}
					</Select>
				)
			case 'checkbox':
				return <Checkbox {...item.props} />
			default:
				return <Input {...(item as any).props} />
		}
	}

	const renderFormItem = (item: FormColumn<T>) => {
		const { children, labelPlaceholder, ...rest } = item

		const hasLabelPlaceholder = EMPTY_VALUE_LIST.includes(labelPlaceholder) ? true : labelPlaceholder

		const formItemProps: FormItemProps<T> = {
			colon: false,
			labelCol: { span: 8 },
			wrapperCol: { span: 16 },
			...rest,
			label: hasLabelPlaceholder ? EMPTY_VALUE_LIST.includes(rest.label) ? <span></span> : rest.label : rest.label
		}

		return <Form.Item {...formItemProps}>{children ? children : renderComponent(rest)}</Form.Item>
	}

	return (
		<div className="form_wrapper">
			<Form form={form} {...props.formProps} onFinish={onSubmit} onValuesChange={onFormChange}>
				<Row {...rowProps}>
					{(props.columns || []).map((item, i) => {
						const { show, key, colProps: itemColProps, ...rest } = item
						const _show =
							typeof show === 'function' ? show({ formData: props.data, index: i }) : show === void 0 ? true : show

						if (_show) {
							const _col_props =
								itemColProps !== void 0
									? typeof itemColProps === 'number'
										? { ...colProps, span: itemColProps }
										: { ...colProps, ...itemColProps }
									: colProps

							return (
								<Col {..._col_props} key={key || (item.name as string) || i}>
									{renderFormItem(rest)}
								</Col>
							)
						} else {
							return null
						}
					})}
				</Row>
			</Form>
		</div>
	)
}

export default FormEditor
