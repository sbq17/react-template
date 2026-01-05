import { ConfigProvider, type ConfigProviderProps } from 'antd'
import { RouterProvider } from 'react-router'
import { router } from './routes'

function App() {
	const configProps: ConfigProviderProps = {
		componentSize: 'small'
	}

	return (
		<ConfigProvider {...configProps}>
			<RouterProvider router={router} />
		</ConfigProvider>
	)
}

export default App
