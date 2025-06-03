import { useState } from 'react'

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
		<div className="p-6 flex flex-col items-center">
			<h1 className="text-2xl font-bold mb-4">数独游戏</h1>

			{/* 数独网格 */}
			<div className="grid grid-cols-9 gap-px bg-gray-800 border-2 border-gray-800 mb-4">
				{board.map((row, rowIndex) =>
					row.map((cell, colIndex) => (
						<div
							key={`${rowIndex}-${colIndex}`}
							onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
							className={`w-12 h-12 flex items-center justify-center text-xl cursor-pointer
                ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'bg-blue-200' : 'bg-white'}
                ${(Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0 ? '' : 'bg-gray-50'}`}
						>
							{cell !== 0 && cell}
						</div>
					))
				)}
			</div>

			{/* 数字选择栏 */}
			<div className="grid grid-cols-9 gap-2">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
					<button
						key={num}
						onClick={() => handleNumberSelect(num)}
						className="w-12 h-12 bg-blue-500 text-white rounded hover:bg-blue-600 
              flex items-center justify-center text-xl"
					>
						{num}
					</button>
				))}
			</div>

			{/* 清除按钮 */}
			<button
				onClick={() => selectedCell && handleNumberSelect(0)}
				className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
			>
				清除
			</button>
		</div>
	)
}

export default SudokuGame
