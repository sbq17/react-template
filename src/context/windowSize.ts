import { useSize } from 'ahooks'
import { createContext } from 'react'

export const useWindowSize = () => {
	const dom = useRef<HTMLElement>()
	const size = useSize(dom)
	return { dom, size }
}

export const windowSizeContext = createContext<ReturnType<typeof useSize>>(undefined)
