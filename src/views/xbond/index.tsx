/**
 * xbond定时下单
 */
import EspPage from './espPage'
import XbondPage from './xbondPage'
import Split from 'react-split'

import './index.css'

export default function XBondOrder() {
	return (
		<div className="xbond_page_wrapper">
			<Split
				sizes={[50, 50]}
				minSize={100}
				expandToMin={false}
				gutterSize={10}
				gutterAlign="center"
				snapOffset={4}
				dragInterval={1}
				direction="vertical"
				cursor="row-resize"
				className="w-full h-full xbond_split_wrapper"
			>
				<XbondPage />
				<EspPage />
			</Split>
		</div>
	)
}
