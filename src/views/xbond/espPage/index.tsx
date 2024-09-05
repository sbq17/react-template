import { TabsProps } from 'antd'
import EspTab from './components/EspTab'
import OrderTab from './components/OrderTab'
import ToPushPage from './components/ToPushPage'
import BlackList from './components/BlackList'
import MarketInfo from './components/MarketInfo'

export default function EspPage() {
	const tabs: TabsProps['items'] = [
		{
			label: 'ESP',
			key: 'esp',
			children: <EspTab />
		},
		{
			label: '订单',
			key: 'order',
			children: <OrderTab />
		},
		{
			label: '待推送',
			key: 'toPushPage',
			children: <ToPushPage />
		},
		{
			label: '券商黑名单',
			key: 'blackList',
			children: <BlackList />
		},
		{
			label: '开市信息',
			key: 'marketInfo',
			children: <MarketInfo />
		}
	]

	const [tab, setTab] = useState<string>('esp')
	// <Tabs type="card" items={tabs} className="pt-1" />

	return (
		<div className="pt-1 relative">
			<div className="flex gap-2 absolute top-1">
				{tabs.map(({ key, label }) => (
					<div
						className={`h-6 bg-slate-500 flex items-center px-2 rounded ${tab === key ? '!bg-amber-400 text-black' : 'cursor-pointer'}`}
						key={key}
						onClick={() => {
							console.log(key, tab)

							if (key !== tab) {
								setTab(key)
							}
						}}
					>
						{label}
					</div>
				))}
			</div>
			<div className="component_esp_wrapper">{find(tabs, { key: tab })?.children}</div>
		</div>
	)
}
