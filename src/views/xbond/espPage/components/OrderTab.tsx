const SELECT_TYPE = [
	{ value: 'N', label: '今日' },
	{ value: 'H', label: '历史' }
]
export default function OrderTab() {
	const [orderType, setOrderType] = useState<'N' | 'H'>('N')

	return (
		<div>
			<header>
				<div>
					<Select value={orderType} style={{ width: 60 }} onChange={setOrderType} options={SELECT_TYPE} />
				</div>
			</header>
			<main>main</main>
		</div>
	)
}
