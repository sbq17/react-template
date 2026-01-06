/**
 * 标准数独单元格接口
 * @description 定义了9x9标准数独中每个单元格的属性
 */
export interface StandardCell {
	/**
	 * 单元格的值
	 * @description 0表示空单元格，1-9表示已填入的数字
	 */
	value: number

	/**
	 * 单元格所在的行索引
	 * @description 范围：0-8
	 */
	row: number

	/**
	 * 单元格所在的列索引
	 * @description 范围：0-8
	 */
	col: number

	/**
	 * 是否为固定单元格（初始给定的数字）
	 * @description true表示不可修改，false表示可修改
	 */
	isFixed: boolean

	/**
	 * 候选数数组
	 * @description 存储用户标记的候选数字
	 */
	notes: number[]

	/**
	 * 是否被选中
	 * @description true表示当前选中的单元格
	 */
	isSelected: boolean

	/**
	 * 是否存在错误
	 * @description true表示填入的数字违反数独规则
	 */
	isError: boolean
}
