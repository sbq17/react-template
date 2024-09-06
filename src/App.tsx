import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '@/store/counterSlice'

export default function App() {
	// const [count, setCount] = useState(0)

	// const increment = () => setCount((prevCount) => prevCount + 1)

	const count = useSelector((store) => store.counter.value)
	const dispatch = useDispatch()

	return (
		<div className="p-2 flex gap-2">
			<button
				className="flex-1 bg-amber-400 rounded"
				aria-label="Increment value"
				onClick={() => dispatch(increment())}
			>
				递增
			</button>
			<span>{count}</span>
			<button
				className="flex-1 bg-amber-400 rounded"
				aria-label="Decrement value"
				onClick={() => dispatch(decrement())}
			>
				递减
			</button>
		</div>
	)
}

