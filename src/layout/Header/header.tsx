import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	BellOutlined,
	ExperimentOutlined,
	ExportOutlined,
	ImportOutlined,
	MinusOutlined,
	PauseOutlined,
	SettingOutlined,
	UnorderedListOutlined
} from '@ant-design/icons'
import { ReactNode } from 'react'
import { ButtonProps, TooltipProps } from 'antd'
import { useMatch, useNavigate } from 'react-router-dom'
import './index.css'

/**
 * 按钮渲染属性
 */
declare type BtnItemProp = {
	/**
	 * 组件
	 */
	children: ReactNode
	/**
	 * 提示文字
	 */
	tooltipText?: string
	/**
	 * Tooltip组件props
	 */
	tooltipInfo?: TooltipProps
	/**
	 * 渲染key
	 */
	key?: string | number
}

/**
 * 渲染提示按钮
 * @param 按钮属性
 * @returns
 */
const _renderTooltipItem = ({ children, tooltipText, key, tooltipInfo }: BtnItemProp) =>
	tooltipText ? (
		<Tooltip
			key={key}
			placement="bottom"
			{...tooltipInfo}
			title={tooltipText}
			children={children}
			destroyTooltipOnHide
		/>
	) : (
		<>{children}</>
	)

/**
 * 按钮属性配置
 */
const primaryBtnProps: ButtonProps = {
	type: 'primary'
}

/**
 * layout header左侧组件
 */
const LeftItem = () => {
	const btnList: BtnItemProp[] = [
		{
			/**
			 * 撤销挂单btn
			 */
			tooltipText: '撤销所有挂单',
			children: (
				<Button
					className="!w-16"
					danger
					{...primaryBtnProps}
					icon={<PauseOutlined />}
					onClick={() => {
						console.log('撤销所有挂单 todo')
					}}
				/>
			),
			key: 'cancel'
		},
		{
			/**
			 * 一键拉宽btn
			 */
			tooltipText: '一键拉宽报价',
			children: (
				<Button
					className="!w-16 !gap-1"
					{...primaryBtnProps}
					onClick={() => {
						console.log('一键拉宽报价 todo')
					}}
					icon={
						<>
							<ArrowLeftOutlined />
							<MinusOutlined />
							<ArrowRightOutlined />
						</>
					}
				/>
			),
			key: 'bigerPrice'
		}
	]

	return <div className="flex gap-1">{btnList.map((_item) => _renderTooltipItem(_item))}</div>
}

/**
 * layout header右侧组件
 */
const RightItem = () => {
	// 弹窗设置
	const [isModalOpen, setIsModalOpen] = useState(false)
	// 弹窗组件
	const [modalChildren, setModalChildren] = useState<ReactNode>()

	const showModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setModalChildren(null)
	}

	const navigate = useNavigate()

	const [isHome, setHome] = useState(true)
	const isMatchHome = useMatch('/main')

	// const [activedList, setActived] = useState<string[]>([])

	// const _filterActive = (btnItem: BtnItemProp) => {
	// 	const {} = btnItem
	// }

	useEffect(() => {
		if (isMatchHome) {
			setHome(true)
		} else {
			setHome(false)
		}
	}, [isMatchHome])

	const homeBtn: BtnItemProp = {
		// 回首页
		children: (
			<Button
				{...primaryBtnProps}
				className="home_btn_css"
				onClick={() => {
					navigate('/main')
				}}
			>
				回首页
			</Button>
		),
		key: 'goHome'
	}

	const RenderHomeBtn = () => <>{isHome ? null : <div>{_renderTooltipItem(homeBtn)}</div>}</>

	const setBtnList_1: BtnItemProp[] = [
		{
			// 全行报价
			tooltipText: '全行报价',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						navigate('all-quote')
					}}
				>
					ALL
				</Button>
			),
			key: 'ALL_PRICE'
		},
		{
			// 导入
			tooltipText: '从Excel导入做市债券',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						console.log('从Excel导入做市债券 todo')
					}}
					icon={<ImportOutlined />}
				/>
			),
			key: 'IMPORT'
		},
		{
			// 导出
			tooltipText: '导出做市债券到Excel文件',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						console.log('导出做市债券到Excel文件 todo')
					}}
					icon={<ExportOutlined />}
				/>
			),
			key: 'EXPORT'
		},
		{
			// 做市任务报表
			tooltipText: '做市任务报表',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						navigate('/market-score')
					}}
					icon={<SvgIcon name="report" />}
				/>
			),
			key: 'TASK_REPORT'
		}
	]

	const RenderBtnList1 = () => (
		<div className="flex items-center gap-1">
			{setBtnList_1.map((_item) => {
				if (isHome) {
					return _renderTooltipItem(_item)
				} else {
					return _item.key === 'TASK_REPORT' ? _renderTooltipItem(_item) : null
				}
			})}
		</div>
	)

	const setBtnList_2: BtnItemProp[] = [
		{
			// 待办事项
			tooltipText: '当前没有未确认待办事项',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						console.log('当前没有未确认待办事项 todo')
					}}
					icon={<SvgIcon name="todo" />}
				/>
			),
			key: 'TO_DO'
		},
		{
			// 消息提醒
			tooltipText: '当前没有未读消息提醒',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						console.log('当前没有未读消息提醒 todo')
					}}
					icon={<BellOutlined />}
				/>
			),
			key: 'MESSAGE'
		},
		{
			//
			tooltipText: '消息历史',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						navigate('/message-history')
					}}
					icon={<SvgIcon name="msgHistory" />}
				/>
			),
			key: 'MESSAGE_HISTORY'
		},
		{
			// xbond
			tooltipText: 'XBOND定时下单',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						navigate('/xbond')
					}}
					icon={<SvgIcon name="xbond" />}
				/>
			),
			key: 'XBOND_ORDER'
		}
	]

	const RenderBtnList2 = () => (
		<div className="flex items-center gap-1">{setBtnList_2.map((_item) => _renderTooltipItem(_item))}</div>
	)

	const setBtnList_3: BtnItemProp[] = [
		{
			/**
			 * 报价策略全局按钮
			 */
			tooltipText: '报价策略全局统一设置',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						showModal()
						setModalChildren(
							<div>
								<div>报价策略全局统一设置</div>
							</div>
						)
						console.log('报价策略全局统一设置 todo')
					}}
					icon={<ExperimentOutlined />}
				/>
			),
			key: 'PRICE_STRATEGY'
		},
		{
			/**
			 * 全局行情数据按钮
			 */
			tooltipText: '全局行情数据来源设置',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						showModal()
						console.log('全局行情数据来源设置 todo')
					}}
					icon={<UnorderedListOutlined />}
				/>
			),
			key: 'GLOBAL_DATA'
		}
	]

	const RenderBtnList3 = () => (
		<div className="flex items-center gap-1">{setBtnList_3.map((_item) => _renderTooltipItem(_item))}</div>
	)

	const infoBtnList: BtnItemProp[] = [
		{
			/**
			 * 退出按钮
			 */
			tooltipText: '退出',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						console.log('退出 todo')
					}}
					icon={<SvgIcon name="logout" />}
				/>
			),
			tooltipInfo: { placement: 'bottomLeft' },
			key: 'LOGOUT'
		},
		{
			/**
			 * 设置按钮
			 */
			tooltipText: '设置',
			children: (
				<Button
					{...primaryBtnProps}
					onClick={() => {
						console.log('设置 todo')
					}}
					icon={<SettingOutlined />}
				/>
			),
			tooltipInfo: { placement: 'bottomLeft' },
			key: 'SYSTEM_SETTING'
		}
	]

	const InfoItem = () => (
		<div className="flex items-center gap-1">
			<div>hello</div>
			{infoBtnList.map((_item) => _renderTooltipItem(_item))}
		</div>
	)

	return (
		<div className="layout_header_wrapper">
			<RenderHomeBtn />
			<RenderBtnList1 />
			<RenderBtnList2 />
			<RenderBtnList3 />
			<InfoItem />
			<Modal
				title="12312"
				open={isModalOpen}
				onCancel={closeModal}
				children={modalChildren}
				cancelButtonProps={{ danger: true, type: 'primary' }}
				centered
				// style={{ height: '100%' }}
				destroyOnClose
			/>
		</div>
	)
}

export default function LayoutHeader() {
	return (
		<div className="flex items-center h-full px-2 justify-between">
			{/* 顶部左侧布局 */}
			<LeftItem />
			{/* 顶部右侧布局 */}
			<RightItem />
		</div>
	)
}
