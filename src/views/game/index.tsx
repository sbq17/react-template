import { useState } from 'react'
import { GameHeader } from './GameHeader'
import { NumberPad } from './NumberPad'
import { SudokuBoard } from './SudokuBoard'

const SudokuGame = () => {
	// 初始化9x9数独网格
	const initialBoard = Array(9)
		.fill(null)
		.map(() => Array(9).fill(0))
	const [board, setBoard] = useState<number[][]>(initialBoard)
	const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)

	// 处理数字选择
	const handleNumberSelect = (number: number) => {
		if (!selectedCell) return

		const newBoard = [...board]
		newBoard[selectedCell.row][selectedCell.col] = number
		setBoard(newBoard)
	}

	return (
		<div className="p-6 flex flex-col items-center w-full max-w-2xl">
			<GameHeader />
			<SudokuBoard board={board} selectedCell={selectedCell} onCellSelect={setSelectedCell} />
			<NumberPad onNumberSelect={handleNumberSelect} onClear={() => selectedCell && handleNumberSelect(0)} />
		</div>
	)
}

export default SudokuGame
