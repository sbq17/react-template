import { theme, ConfigProvider } from 'antd'
import LayoutComponent from '@/layout'
import zhCN from 'antd/locale/zh_CN'
// for date-picker i18n
import 'dayjs/locale/zh-cn'
import { BrowserRouter } from 'react-router-dom'
import { useWindowSize, windowSizeContext } from './context/windowSize'

export default function App() {
	const { dom, size } = useWindowSize()

	return (
		<ConfigProvider
			theme={{
				cssVar: true,
				algorithm: theme.darkAlgorithm,
				token: {
					colorPrimary: '#136C5E',
					fontSize: 12
				},
				components: {
					Modal: {
						headerBg: '#136C5E'
					},
					Tabs: {
						cardPaddingSM: '4px 8px',
						cardGutter: 8,
						colorBgContainer: 'orange',
						borderRadius: 0,
						itemSelectedColor: 'black',
						margin: 8
					}
				}
			}}
			// button={{

			// }}
			componentSize="small"
			modal={{
				classNames: {
					content: 'custom_modal_css'
				},
				// 包裹器类名
				className: 'custom_modal_wrapper_css',
				styles: {
					content: { padding: 0, borderRadius: 0, background: '#172422' },
					header: {
						padding: '0 8px',
						height: '32px',
						borderRadius: 0,
						marginBottom: 8
					},
					body: {
						padding: '0 8px'
					},
					footer: {
						padding: '0 8px',
						height: '32px',
						marginTop: 8,
						borderTop: '1px solid #7b7b7b'
					}
				}
			}}
			locale={zhCN}
		>
			<BrowserRouter>
				<windowSizeContext.Provider value={size}>
					<LayoutComponent ref={dom} />
				</windowSizeContext.Provider>
			</BrowserRouter>
		</ConfigProvider>
	)
}

