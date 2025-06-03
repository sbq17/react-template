import { Button } from 'antd'

export interface NumberPadProps {
	onNumberSelect: (num: number) => void
	onClear: () => void
}

export const NumberPad = ({ onNumberSelect, onClear }: NumberPadProps) => {
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="grid grid-cols-9 gap-2">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
					<Button
						key={num}
						type="primary"
						className="w-12 h-12 flex items-center justify-center text-lg"
						onClick={() => onNumberSelect(num)}
					>
						{num}
					</Button>
				))}
			</div>
			<Button
				danger
				className="w-32 h-10 text-base"
				onClick={onClear}
			>
				清除
			</Button>
		</div>
	)
}
