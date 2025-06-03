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
				(gridRow + gridCol) % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
			} dark:${(gridRow + gridCol) % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} p-0.5`}
		>
			{cells.map((cell, index) => {
				const row = gridRow * 3 + Math.floor(index / 3)
				const col = gridCol * 3 + (index % 3)
				const isInnerBorderRight = index % 3 !== 2
				const isInnerBorderBottom = Math.floor(index / 3) !== 2

				return (
					<div
						key={index}
						onClick={() => onCellSelect({ row, col })}
						className={`w-12 h-12 flex items-center justify-center text-xl cursor-pointer
            border-gray-300 dark:border-gray-600
            ${isInnerBorderRight && 'border-r'}
            ${isInnerBorderBottom && 'border-b'}
            ${
							selectedCell?.row === row && selectedCell?.col === col
								? 'bg-blue-200 dark:bg-blue-900/80' // 移除边框相关样式
								: 'bg-transparent hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
						}
            text-gray-800 dark:text-gray-200 font-medium`}
					>
						{cell !== 0 && cell}
					</div>
				)
			})}
		</div>
	)
}
