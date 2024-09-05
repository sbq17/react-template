export class Queue<T> {
	private items: T[] = []

	constructor(_items?: T[]) {
		this.items = _items ? _items : []
	}

	/**
	 * 入队
	 * @param item 元素
	 */
	enqueue(item: T): void {
		this.items.push(item)
	}

	/**
	 * 出队
	 * @returns
	 */
	dequeue(): T | undefined {
		return this.items.shift()
	}

	/**
	 * 查看队头元素
	 */
	peek(): T | undefined {
		return this.items[0]
	}

	/**
	 * 检查队列是否为空
	 */
	isEmpty(): boolean {
		return this.items.length === 0
	}

	/**
	 * 清空队列
	 */
	clear() {
		this.items = []
	}

	/**
	 * 打印队列内容
	 */
	print() {
		console.log(this.items)
	}
}
