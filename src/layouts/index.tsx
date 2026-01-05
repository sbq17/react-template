import AppMain from './components/AppMain'
import Toolbox from './components/Toolbox'
import Footer from './components/Footer'
import { Outlet } from 'react-router'
import './index.css'

export default function Layout() {
	return (
		<div className="app_layout_wrapper">
			<Toolbox></Toolbox>
			<AppMain>
				<Outlet />
			</AppMain>
			<Footer></Footer>
		</div>
	)
}

