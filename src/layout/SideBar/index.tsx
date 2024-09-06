import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const SideBar = () => {
	const navigate = useNavigate()

	const items: MenuItem[] = [
		{
			key: 'sub1',
			label: 'Navigation One',
			icon: <MailOutlined />,
			children: [
				{
					key: 'g1',
					label: 'Item 1',
					type: 'group',
					children: [
						{ key: '1', label: 'Option 1' },
						{ key: '2', label: 'Option 2' }
					]
				},
				{
					key: 'g2',
					label: 'Item 2',
					type: 'group',
					children: [
						{ key: '3', label: 'Option 3' },
						{ key: '4', label: 'Option 4' }
					]
				}
			]
		},
		{
			key: 'sub2',
			label: 'Navigation Two',
			icon: <AppstoreOutlined />,
			children: [
				{ key: '5', label: 'Option 5' },
				{ key: '6', label: 'Option 6' },
				{
					key: 'sub3',
					label: 'Submenu',
					children: [
						{ key: '7', label: 'Option 7' },
						{ key: '8', label: 'Option 8' }
					]
				}
			]
		},
		// {
		// 	type: 'divider'
		// },
		{
			key: 'sub4',
			label: 'Navigation Three',
			icon: <SettingOutlined />,
			children: [
				{ key: '9', label: 'Option 9' },
				{ key: '10', label: 'Option 10' },
				{ key: '11', label: 'Option 11' },
				{ key: '12', label: 'Option 12' }
			]
		},
		{
			key: 'grp',
			label: 'Group',
			type: 'group',
			children: [
				{ key: '13', label: 'Option 13' },
				{ key: '14', label: 'Option 14' }
			]
		},
		{
			key: 'grp-2',
			label: 'Group-2',
			type: 'group',
			children: [
				{ key: '15', label: 'Option 15' },
				{ key: '16', label: 'Option 16' }
			]
		},
		{
			key: 'grp-3',
			label: 'Group-3',
			type: 'group',
			children: [
				{ key: '17', label: 'Option 17' },
				{ key: '18', label: 'Option 18' }
			]
		},
		{
			key: 'grp-4',
			label: 'Group-4',
			type: 'group',
			children: [
				{ key: '19', label: 'Option 19' },
				{ key: '20', label: 'Option 20' }
			]
		}
	]

	// items.forEach((item) => {
	// 	item!.style = { ...item?.style, height: 28 }
	// })

	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e)
		navigate('/xbond')
	}

	return (
		<Menu
			onClick={onClick}
			style={{ width: '100%', height: '100%', overflow: 'auto' }}
			defaultSelectedKeys={['1']}
			defaultOpenKeys={['sub1']}
			mode="inline"
			items={items}
		/>
	)
}

export default SideBar
