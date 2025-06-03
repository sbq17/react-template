import { Navigate } from 'react-router-dom'

// const pageRoutes: CustomRouteProp[] = [
// 	{
// 		path: '/main',
// 		Component: lazy(() => import('@/views/HomePage'))
// 	},
// 	{
// 		path: '/sudoku',
// 		Component: lazy(() => import('@/views/game/SudokuGame'))
// 	}
// ]

export const routes: CustomRouteProp[] = [
	{
		path: '/',
		element: <Navigate to="/main" />
	},
	{
		path: '/main',
		Component: lazy(() => import('@/views/HomePage')),
		useLayout: false
	},
	{
		path: '/sudoku',
		Component: lazy(() => import('@/views/game/SudokuGame')),
		useLayout: false
	},
	{
		path: '*',
		element: <Navigate to="/main" />
	}
]
