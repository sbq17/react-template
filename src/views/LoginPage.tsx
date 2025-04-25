import { FormColumn } from '@/components/FormEditor/types'

declare type LoginInfo = {
	username: string
	password: string
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
		{
			label: '用户名',
			name: 'username'
		},
		{
			label: '密码',
			name: 'password'
		}
	]

	return (
		<div className="flex-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
				<FormEditor data={userInfo} columns={columns} />
				<BtnItem label={'登录'} className="w-full" type="primary" />
			</div>
		</div>
	)
}

export default LoginPage
