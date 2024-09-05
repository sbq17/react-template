import { ReactNode } from 'react'

interface Props {
	/**
	 * svg名称
	 */
	name: string
	/**
	 * 前缀
	 */
	prefix?: string
	/**
	 * 颜色
	 */
	color?: string
}

export default function SvgIcon({ name, prefix = 'icon', color = '#fff', ...props }: Props): ReactNode {
	const symbolId = `#${prefix}-${name}`

	props = reduce<Record<string, string | number | boolean>, Record<string, string | number | boolean>>(
		props,
		(_mg, v, k) => {
			if (typeof v === 'boolean') {
				v = v + ''
			}
			_mg[k] = v
			return _mg
		},
		{}
	)

	return (
		<svg {...props} aria-hidden="true" className="w-4 h-4">
			<use href={symbolId} fill={color} />
		</svg>
	)
}
