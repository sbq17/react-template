import { TabsProps } from 'antd'
import XbondTab from './components/XbondTab'
import HistoryInfo from './components/HistoryInfo'
import MarketInfo from './components/MarketInfo'

export default function BondTabPage() {
	const tabs: TabsProps['items'] = [
		{
			label: 'xbond',
			key: 'xbond',
			children: <XbondTab />
		},
		{
			label: '历史',
			key: 'history',
			children: <HistoryInfo />
		},
		{
			label: '开市信息',
			key: 'market',
			children: <MarketInfo />
		}
	]

	return <Tabs type="card" items={tabs} />
}
