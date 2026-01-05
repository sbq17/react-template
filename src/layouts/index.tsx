import AppMain from './components/AppMain'
import Toolbox from './components/Toolbox'
import Footer from './components/Footer'
import './index.css'
export default function Layout() {
	return (
		<div className="app_layout_wrapper">
			<Toolbox></Toolbox>
			<AppMain></AppMain>
			<Footer></Footer>
		</div>
	)
}
