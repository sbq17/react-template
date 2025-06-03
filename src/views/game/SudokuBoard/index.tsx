import { CellPosition } from '../types'
import { SudokuGrid } from './SudokuGrid'

export const SudokuBoard = ({ board, selectedCell, onCellSelect }: SudokuBoardProps) => {
	return (
		<div className="grid grid-cols-3 gap-px bg-gray-200 border-2 border-gray-200 mb-4 dark:bg-gray-700 dark:border-gray-600">
			{[...Array(3)].map((_, gridRow) =>
				[...Array(3)].map((_, gridCol) => {
					const cells = []
					for (let i = 0; i < 3; i++) {
						for (let j = 0; j < 3; j++) {
							cells.push(board[gridRow * 3 + i][gridCol * 3 + j])
						}
					}
					return (
						<SudokuGrid
							key={`${gridRow}-${gridCol}`}
							gridRow={gridRow}
							gridCol={gridCol}
							cells={cells}
							selectedCell={selectedCell}
							onCellSelect={onCellSelect}
						/>
					)
				})
			)}
		</div>
	)
}
interface SudokuBoardProps {
	board: number[][]
	selectedCell: CellPosition | null
	onCellSelect: (pos: CellPosition) => void
}
