import { createBrowserRouter, redirect } from 'react-router'
import Layout from '@/layouts'
import DashboardPage from '@/views/dashboard'
import StandardPage from '@/views/standard'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <DashboardPage />
			},
			{
				path: 'standard',
				element: <StandardPage />
			},
			{
				path: '*',
				loader: () => redirect('/')
			}
		]
	}
])

