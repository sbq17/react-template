import { ConfigProvider, type ConfigProviderProps } from 'antd'
import Layout from './layouts'

function App() {
	const configProps: ConfigProviderProps = {
		componentSize: 'small'
	}

	return (
		<ConfigProvider {...configProps}>
			<Layout />
		</ConfigProvider>
	)
}

export default App
