import type { Difficulty } from '@/types'

export class StandardSudoku {
	constructor() {}

	/**
	 * 不同难度对应的挖空格子数量配置
	 * @description 9x9数独共81个格子，挖空数量范围（基于数独竞赛标准）：
	 * - easy: 26-36个格子被挖空，剩余45-55个已知数
	 * - medium: 36-46个格子被挖空，剩余35-45个已知数
	 * - hard: 46-56个格子被挖空，剩余25-35个已知数
	 * - expert: 56-64个格子被挖空，剩余17-25个已知数（17是唯一解的最小值）
	 */
	private readonly difficultyConfig: Record<Difficulty, { min: number; max: number }> = {
		easy: { min: 26, max: 36 },
		medium: { min: 36, max: 46 },
		hard: { min: 46, max: 56 },
		expert: { min: 56, max: 64 }
	}

	/**
	 * 根据难度获取挖空格子数量
	 * @param difficulty 难度级别
	 * @returns 挖空格子数量
	 */
	public getEmptyCellsCount(difficulty: Difficulty): number {
		const config = this.difficultyConfig[difficulty]
		return Math.floor(Math.random() * (config.max - config.min + 1)) + config.min
	}

	/**
	 * 根据难度获取已知格子数量
	 * @param difficulty 难度级别
	 * @returns 已知格子数量
	 */
	public getGivenCellsCount(difficulty: Difficulty): number {
		const totalCells = 81
		return totalCells - this.getEmptyCellsCount(difficulty)
	}

	/**
	 * 获取难度对应的配置信息
	 * @param difficulty 难度级别
	 * @returns 配置信息，包含挖空数量范围和已知数量范围
	 */
	public getDifficultyConfig(difficulty: Difficulty) {
		const config = this.difficultyConfig[difficulty]
		const totalCells = 81
		return {
			emptyCells: {
				min: config.min,
				max: config.max
			},
			givenCells: {
				min: totalCells - config.max,
				max: totalCells - config.min
			}
		}
	}
}
