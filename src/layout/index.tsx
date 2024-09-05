import LayoutHeader from './Header/header'

import { CSSProperties, LegacyRef, Suspense } from 'react'
import { routes as routesList } from '@/router'
import { Route, Routes, useRoutes } from 'react-router-dom'

export default forwardRef(function LayoutComponent(props, ref) {
	const { Header, Footer, Content } = Layout

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

	return (
		<Layout {...props} style={layoutStyle} ref={ref as LegacyRef<HTMLDivElement>}>
			{isUseLayout ? (
				<Header style={headerStyle}>
					<LayoutHeader />
				</Header>
			) : null}
			<Content style={contentStyle}>
				<Suspense>
					<Routes>
						{routesList.map((item) => (
							<Route {...item} key={item.path}></Route>
						))}
						<Route></Route>
					</Routes>
				</Suspense>
			</Content>
			{isUseLayout ? <Footer style={footerStyle}>Footer</Footer> : null}
		</Layout>
	)
})
