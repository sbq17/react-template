import { FormColumn } from '@/components/FormEditor/types'

declare type LoginInfo = {
	username: string
	password: string
	bio?: string
	search?: string
	otp?: string
	gender?: 'male' | 'female'
	remember?: boolean
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
			label: '记住我',
			name: 'remember',
			type: 'checkbox',
			valuePropName: 'checked',
			props: {
				defaultChecked: true
			}
		}
	]

	return (
		<div className="flex-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
				<FormEditor data={userInfo} columns={columns} onSubmit={handleSubmit} />
				{/* <BtnItem 
					label={'登录'} 
					className="w-full" 
					type="primary" 
					onClick={() => form.submit()}
				/> */}
			</div>
		</div>
	)
}

export default LoginPage
