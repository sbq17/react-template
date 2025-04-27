import { FormColumn } from '@/components/FormEditor/types'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'

type UserItem = {
	username: string
	password: string
}

const LoginPage = () => {
	const [userInfo, setUserInfo] = useState<UserItem>({ username: '', password: '' })

	const columns: FormColumn<UserItem>[] = [
		{
			label: '用户名',
			name: 'username',
			type: 'input',
			rules: [{ required: true, message: '请输入用户名' }],
			props: {
				placeholder: '请输入用户名',
				size: 'large',
				prefix: <UserOutlined />
			}
		},
		{
			label: '密码',
			name: 'password',
			type: 'inputPassword',
			rules: [{ required: true, message: '请输入密码' }],
			props: {
				placeholder: '请输入密码',
				size: 'large',
				prefix: <LockOutlined />,
				visibilityToggle: true
			}
		}
	]

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-800">欢迎登录</h1>
					<p className="mt-2 text-gray-600">请输入您的账号信息</p>
				</div>

				<FormEditor data={userInfo} columns={columns} onFormChange={({ allValues }) => setUserInfo(allValues)} />

				<Button type="primary" size="large" className="w-full mt-6" onClick={() => console.log(userInfo)}>
					登录
				</Button>
			</div>
		</div>
	)
}

export default LoginPage
