import { ConfigProvider, type ConfigProviderProps } from 'antd'

function App() {
	const configProps: ConfigProviderProps = {
		componentSize: 'small'
	}

	return (
		<ConfigProvider {...configProps}>
			<div>1231</div>
		</ConfigProvider>
	)
}

export default App
