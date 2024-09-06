import { MenuFoldOutlined } from '@ant-design/icons'
import './index.css'
import TagsView from './TagsView'

const HeaderLeft = () => {
	return (
		<div className="header_left_wrapper">
			<MenuFoldOutlined className="text-[20px] cursor-pointer hover:text-blue-400" />
			<Breadcrumb items={[{ title: 'sample' }]} />;
		</div>
	)
}

export default function LayoutHeader() {
	return (
		<div className="layout_header_wrapper">
			{/* <div className="h-full w-full flex">
				<div className="h-full bg-amber-400 w-10"></div>
				<div className="m-auto"></div>
				<div className="h-full bg-amber-400 w-10"></div>
			</div> */}
			<HeaderLeft />

			<TagsView />
		</div>
	)
}
