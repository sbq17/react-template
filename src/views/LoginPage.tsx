declare type LoginInfo = {
	username: string
	password: string
}

const LoginPage = () => {
	const [userInfo, setUserInfo] = useState<LoginInfo>({ password: '123456', username: 'admin' })

	const { run } = useAxios<{ data: { token: string } }, LoginInfo>(
		API_USER_LOGIN,
		{
			method: 'post',
			data: userInfo
		},
		{
			immediate: true,
			deps: [userInfo],
			onSuccess: ({ responseData }) => {
				console.log(responseData)
			}
		}
	)

	return <div className="flex-center">123123</div>
}

export default LoginPage
