import type { ReactNode } from 'react'

interface AppMainProps {
	children?: ReactNode
}

export default function AppMain({ children }: AppMainProps) {
	return <div className="app_layout_main">{children}</div>
}

