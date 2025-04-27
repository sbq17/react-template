import { FormColumn } from '@/components/FormEditor/types'
import { FormProps } from 'antd'

declare type LoginInfo = {
	username: string
	password: string
	bio?: string
	search?: string
	otp?: string
	gender?: 'male' | 'female'
	remember?: boolean
}

type FieldType = {
	username?: string
	password?: string
	remember?: string
}

const LoginPage = () => {
	const [userInfo, setUserInfo] = useState<LoginInfo>({ password: '', username: '' })

	const { run } = useAxios<{ data: { token: string } }, LoginInfo>(
		API_USER_LOGIN,
		{
			method: 'post',
			data: userInfo
		},
		{
			immediate: false,
			onSuccess: ({ responseData }) => {
				console.log(responseData)
			}
		}
	)

	const handleSubmit = (values: LoginInfo) => {
		run({ data: values })
	}

	const columns: FormColumn<LoginInfo>[] = [
		// 输入框
		{
			label: '用户名',
			name: 'username',
			type: 'input',
			props: {
				placeholder: '请输入用户名'
			}
		},
		// 密码框
		{
			label: '密码',
			name: 'password',
			type: 'inputPassword',
			props: {
				placeholder: '请输入密码',
				visibilityToggle: true
			}
		},
		// 文本域
		{
			label: '个人简介',
			name: 'bio',
			type: 'inputTextarea',
			props: {
				rows: 4,
				placeholder: '请输入个人简介'
			}
		},
		// 搜索框
		{
			label: '搜索',
			name: 'search',
			type: 'inputSearch',
			props: {
				placeholder: '请输入搜索内容',
				enterButton: true
			}
		},
		// OTP验证码
		{
			label: '验证码',
			name: 'otp',
			type: 'inputOtp',
			props: {
				length: 6
			}
		},
		// 选择框
		{
			label: '性别',
			name: 'gender',
			type: 'select',
			options: [
				{ label: '男', value: 'male' },
				{ label: '女', value: 'female' }
			]
		},
		// 复选框
		{
			label: null,
			name: 'remember',
			type: 'checkbox',
			valuePropName: 'checked',
			props: {
				children: '记住我'
			}
			// props: {
			// 	defaultChecked: true
			// }
		}
	]

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values)
	}

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className="flex-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
				<FormEditor data={userInfo} columns={columns} onFormChange={setUserInfo} onSubmit={handleSubmit} />

				{/* <Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item<FieldType>
						label="Username"
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item<FieldType> name="remember" valuePropName="checked" label={null} labelCol={{ span: 8 }}>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item label={null}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form> */}
			</div>
		</div>
	)
}

export default LoginPage
