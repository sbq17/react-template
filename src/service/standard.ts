import type { Difficulty } from '@/types'
import type { StandardCell } from '@/types/standard'

export class StandardSudoku {
	/**
	 * 不同难度对应的挖空格子数量配置
	 * @description 9x9数独共81个格子，挖空数量范围（基于数独竞赛标准）：
	 * - easy: 26-36个格子被挖空，剩余45-55个已知数
	 * - medium: 36-46个格子被挖空，剩余35-45个已知数
	 * - hard: 46-56个格子被挖空，剩余25-35个已知数
	 * - expert: 56-64个格子被挖空，剩余17-25个已知数（17是唯一解的最小值）
	 */
	private readonly difficutOptions: Record<Difficulty, { min: number; max: number }> = {
		easy: { min: 26, max: 36 },
		medium: { min: 36, max: 46 },
		hard: { min: 46, max: 56 },
		expert: { min: 56, max: 64 }
	}

	/**
	 * 挖空格子数量
	 */
	private readonly digHolesCount: number = 0

	/**
	 * 数独棋盘
	 */
	private board: StandardCell[][] = []

	constructor(difficulty: Difficulty) {
		/**
		 * 获取挖空格子数量
		 */
		this.digHolesCount = this.getDigHolesCount(difficulty)

		console.log(this.digHolesCount, `已知${81 - this.digHolesCount}个`)

		this.board = this.initBoard()

		console.log(this.board)
	}

	/**
	 * 获取挖空格子数量
	 * @param difficulty 难度等级
	 * @returns 挖空格子数量
	 */
	private getDigHolesCount(difficulty: Difficulty) {
		const { min, max } = this.difficutOptions[difficulty]
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	/**
	 * 初始化数独棋盘
	 * @description 生成一个9x9的标准数独棋盘，所有单元格初始值为0，
	 */
	private initBoard(): StandardCell[][] {
		console.log(
			Array.from({ length: 9 }, (_, row) => {
				console.log({ _, row })

				return row
			})
		)

		return Array.from({ length: 9 }, (_, row) =>
			Array.from({ length: 9 }, (_, col) => ({
				value: 0,
				row,
				col,
				isFixed: false,
				notes: [],
				isSelected: false,
				isError: false
			}))
		)
	}
}

const standardSudoku = new StandardSudoku('expert')
