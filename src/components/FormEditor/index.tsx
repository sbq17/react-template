import { Col, ColProps, Form, FormProps, Row } from 'antd'
import { FormColumn, FormEditorProps } from './types'

const FormEditor = <T extends object = any>(props: FormEditorProps<T>) => {
	const [form] = Form.useForm<T>()
	console.log(form)

	const onSubmit: FormProps<T>['onFinish'] = (values) => {
		console.log(values)
	}

	const onFormChange: FormProps<T>['onValuesChange'] = (changeValues, allValues) => {
		console.log(changeValues, allValues)
	}

	const renderComponent = (item: FormColumn<T>) => {
		//
	}

	/**
	 * 获取需要展示的列
	 */
	const showColumns = useMemo(() => {
		if (props.columns && props.columns.length) {
			return props.columns.filter((item, index) => {
				const { show } = item

				return typeof show === 'function' ? show({ formData: props.data, index }) : show === void 0 ? true : show
			})
		} else {
			return []
		}
	}, [props.columns])

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

	return (
		<div className="form_wrapper">
			<Form form={form} {...props.formProps} onFinish={onSubmit} onValuesChange={onFormChange}>
				<Row {...rowProps}>
					{showColumns.map((item, i) => {
						const { show, key, colProps: itemColProps, ...restProps } = item
						const _show =
							typeof show === 'function' ? show({ formData: props.data, index: i }) : show === void 0 ? true : show

						if (_show) {
							const _col_props =
								itemColProps !== void 0
									? typeof itemColProps === 'number'
										? { ...colProps, span: itemColProps }
										: { ...colProps, ...itemColProps }
									: colProps

							const { children, ...rest } = restProps

							console.log(rest)

							return (
								<Col {..._col_props} key={key || (item.name as string) || i}>
									<Form.Item {...rest}>{children ? children : renderComponent(restProps)}</Form.Item>
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
