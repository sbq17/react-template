/**
 * sudoku difficulty type
 * @description sudoku difficulty
 */
export declare type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'

/**
 * sudoku type enum
 * @description sudoku game types
 */
export declare enum SudokuType {
	STANDARD = 'standard',
	DIAGONAL = 'diagonal',
	JIGSAW = 'jigsaw',
	KILLER = 'killer',
	WINDOW = 'window',
	SAMURAI = 'samurai',
	CONSECUTIVE = 'consecutive',
	ODD = 'odd',
	EVEN = 'even',
	MINI = 'mini',
	GIANT = 'giant',
	ALPHABET = 'alphabet',
	PICTURE = 'picture',
	NON_CONSECUTIVE = 'non-consecutive',
	PRODUCT = 'product',
	ARROW = 'arrow'
}

/**
 * base sudoku interface
 * @description common properties for all sudoku types
 */
export declare interface BaseSudoku {
	id: string
	type: SudokuType
	difficulty: Difficulty
	grid: number[][]
	solution: number[][]
	createdAt: Date
	updatedAt: Date
}

/**
 * standard sudoku interface
 * @description standard 9x9 sudoku
 */
export declare interface StandardSudoku extends BaseSudoku {
	type: SudokuType.STANDARD
}

/**
 * diagonal sudoku interface
 * @description standard sudoku with diagonal constraints
 */
export declare interface DiagonalSudoku extends BaseSudoku {
	type: SudokuType.DIAGONAL
}

/**
 * jigsaw sudoku interface
 * @description sudoku with irregular regions
 */
export declare interface JigsawSudoku extends BaseSudoku {
	type: SudokuType.JIGSAW
	regions: number[][] // defines the irregular regions
}

/**
 * killer sudoku interface
 * @description sudoku with cage constraints
 */
export declare interface KillerSudoku extends BaseSudoku {
	type: SudokuType.KILLER
	cages: {
		cells: [number, number][] // [row, col] pairs
		sum: number
	}[]
}

/**
 * window sudoku interface
 * @description sudoku with window regions
 */
export declare interface WindowSudoku extends BaseSudoku {
	type: SudokuType.WINDOW
	windows: {
		topLeft: [number, number] // top-left corner of each 3x3 window
		topRight: [number, number]
		bottomLeft: [number, number]
		bottomRight: [number, number]
	}
}

/**
 * samurai sudoku interface
 * @description 5 overlapping standard sudokus
 */
export declare interface SamuraiSudoku {
	id: string
	type: SudokuType.SAMURAI
	difficulty: Difficulty
	grids: {
		center: number[][]
		topLeft: number[][]
		topRight: number[][]
		bottomLeft: number[][]
		bottomRight: number[][]
	}
	solutions: {
		center: number[][]
		topLeft: number[][]
		topRight: number[][]
		bottomLeft: number[][]
		bottomRight: number[][]
	}
	createdAt: Date
	updatedAt: Date
}

/**
 * consecutive sudoku interface
 * @description sudoku with consecutive constraints
 */
export declare interface ConsecutiveSudoku extends BaseSudoku {
	type: SudokuType.CONSECUTIVE
	consecutivePairs: [number, number][][] // [[row1, col1], [row2, col2]] pairs
}

/**
 * odd sudoku interface
 * @description sudoku with odd cell constraints
 */
export declare interface OddSudoku extends BaseSudoku {
	type: SudokuType.ODD
	oddCells: [number, number][] // cells that must be odd
}

/**
 * even sudoku interface
 * @description sudoku with even cell constraints
 */
export declare interface EvenSudoku extends BaseSudoku {
	type: SudokuType.EVEN
	evenCells: [number, number][] // cells that must be even
}

/**
 * mini sudoku interface
 * @description 4x4 or 6x6 sudoku
 */
export declare interface MiniSudoku extends BaseSudoku {
	type: SudokuType.MINI
	size: 4 | 6 // 4x4 or 6x6 grid
}

/**
 * giant sudoku interface
 * @description 12x12 or 16x16 sudoku
 */
export declare interface GiantSudoku extends BaseSudoku {
	type: SudokuType.GIANT
	size: 12 | 16 // 12x12 or 16x16 grid
}

/**
 * alphabet sudoku interface
 * @description sudoku with letters instead of numbers
 */
export declare interface AlphabetSudoku extends BaseSudoku {
	type: SudokuType.ALPHABET
	letters: string[] // mapping from numbers to letters
}

/**
 * picture sudoku interface
 * @description sudoku with picture patterns
 */
export declare interface PictureSudoku extends BaseSudoku {
	type: SudokuType.PICTURE
	picturePattern: number[][] // pattern to be formed by numbers
}

/**
 * non-consecutive sudoku interface
 * @description sudoku with non-consecutive constraints
 */
export declare interface NonConsecutiveSudoku extends BaseSudoku {
	type: SudokuType.NON_CONSECUTIVE
	// no additional properties, constraint is implicit
}

/**
 * product sudoku interface
 * @description sudoku with product constraints
 */
export declare interface ProductSudoku extends BaseSudoku {
	type: SudokuType.PRODUCT
	cages: {
		cells: [number, number][] // [row, col] pairs
		product: number
	}[]
}

/**
 * arrow sudoku interface
 * @description sudoku with arrow constraints
 */
export declare interface ArrowSudoku extends BaseSudoku {
	type: SudokuType.ARROW
	arrows: {
		head: [number, number] // arrow head cell
		body: [number, number][] // arrow body cells
	}[]
}

/**
 * sudoku game interface
 * @description union type for all sudoku game types
 */
export declare type SudokuGame =
	| StandardSudoku
	| DiagonalSudoku
	| JigsawSudoku
	| KillerSudoku
	| WindowSudoku
	| SamuraiSudoku
	| ConsecutiveSudoku
	| OddSudoku
	| EvenSudoku
	| MiniSudoku
	| GiantSudoku
	| AlphabetSudoku
	| PictureSudoku
	| NonConsecutiveSudoku
	| ProductSudoku
	| ArrowSudoku
