export * from './standard'

/**
 * sudoku difficulty type
 * @description sudoku difficulty
 */
export declare type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'

/**
 * sudoku type enum
 * @description sudoku game types
 */
export declare const enum SudokuType {
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
