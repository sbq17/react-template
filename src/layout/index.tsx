import LayoutHeader from './Header/header'

import { CSSProperties, LegacyRef, Suspense } from 'react'
import { routes as routesList } from '@/router'
import { Route, Routes, useRoutes } from 'react-router-dom'

import './index.css'

export default forwardRef(function LayoutComponent(props, ref) {
	const { Header, Footer, Content, Sider } = Layout

	const headerStyle: CSSProperties = {
		height: 36,
		lineHeight: 1,
		padding: 0,
		margin: 0,
		background: '#2f2e2e'
	}

	const contentStyle: CSSProperties = {
		lineHeight: 1,
		padding: 0,
		margin: 0
	}

	const footerStyle: CSSProperties = {
		height: 28,
		lineHeight: 1,
		padding: 0,
		margin: 0,
		background: '#2f2e2e'
	}

	const layoutStyle: CSSProperties = {
		overflow: 'hidden',
		width: '100%',
		height: '100%'
	}

	/**
	 * 路由信息
	 */
	const routes = useRoutes(routesList as RouteObject[])
	const notLayoutRoutes = routesList.filter(({ useLayout }) => useLayout === false)
	const isUseLayout = routes ? findIndex(notLayoutRoutes, { path: routes.props.match.pathname }) === -1 : true

	/**
	 * 主体区域内容
	 */
	const pageContentNode = (
		<Content style={contentStyle} className="layout_content_css">
			<Suspense>
				<Routes>
					{routesList.map((item) => (
						<Route {...item} key={item.path}></Route>
					))}
				</Routes>
			</Suspense>
		</Content>
	)

	return (
		<Layout {...props} style={layoutStyle} ref={ref as LegacyRef<HTMLDivElement>} rootClassName="layout_wrapper">
			{isUseLayout ? (
				<>
					{/* 侧边栏 */}
					<Sider width="25%">Sider</Sider>
					<Layout>
						{/* 顶部栏 */}
						<Header style={headerStyle}>
							<LayoutHeader />
						</Header>
						{/* 主体渲染区域 */}
						{pageContentNode}
						{/* 底部区域 */}
						<Footer style={footerStyle}>Footer</Footer>
					</Layout>
				</>
			) : (
				pageContentNode
			)}
		</Layout>
	)
})
