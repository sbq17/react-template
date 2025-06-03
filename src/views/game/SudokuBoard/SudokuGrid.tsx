import { CellPosition } from '../types'

interface SudokuGridProps {
	gridRow: number
	gridCol: number
	cells: number[]
	selectedCell: CellPosition | null
	onCellSelect: (pos: CellPosition) => void
}

export const SudokuGrid = ({ gridRow, gridCol, cells, selectedCell, onCellSelect }: SudokuGridProps) => {
	return (
		<div
			className={`grid grid-cols-3 gap-0 ${
				(gridRow % 2 === 0 && gridCol % 2 === 0) || (gridRow % 2 === 1 && gridCol % 2 === 1)
					? 'bg-gray-100'
					: 'bg-gray-200'
			} dark:bg-gray-700`}
		>
			{cells.map((cell, index) => {
				const row = gridRow * 3 + Math.floor(index / 3)
				const col = gridCol * 3 + (index % 3)

				return (
					<div
						key={index}
						onClick={() => onCellSelect({ row, col })}
						className={`w-12 h-12 flex items-center justify-center text-xl cursor-pointer transition-colors
            border-2
            ${
							selectedCell?.row === row && selectedCell?.col === col
								? 'border-blue-400 bg-blue-100 dark:bg-blue-800'
								: 'border-gray-300 bg-white hover:bg-blue-50 dark:bg-gray-800'
						}
            text-gray-800 dark:text-gray-100`}
					>
						{cell !== 0 && cell}
					</div>
				)
			})}
		</div>
	)
}
