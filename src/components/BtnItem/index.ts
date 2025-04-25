import { createElement } from 'react'
import type { BtnProps } from './type'

const BtnItem = (props: BtnProps) => {
	const { disabled, show, label, onClick } = props

	const _show = typeof show === 'function' ? show(props) : show === undefined ? true : show

	const _disabled = typeof disabled === 'function' ? disabled(props) : disabled

	return _show
		? createElement(Button, {
				...props,
				disabled: _disabled,
				onClick: (e) => {
					e.stopPropagation()

					if (onClick) {
						onClick({ event: e, params: props })
					}
				},
				children: label || props.children
			})
		: null
}

export default BtnItem
