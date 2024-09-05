import { Navigate } from 'react-router-dom'

const info = import.meta.glob<CustomRouteProp>('@/views/*/page.(ts|tsx)', { eager: true, import: 'default' })

const pageRoutes = reduce<CustomRouteProp, CustomRouteProp[]>(
	info,
	(_routes, v) => {
		return _routes.concat(v)
	},
	[]
)

export const routes: CustomRouteProp[] = [
	{
		path: '/',
		element: <Navigate to="/main"></Navigate>
	},
	...pageRoutes,
	{
		path: '*',
		element: <Navigate to="/main"></Navigate>
	}
]
