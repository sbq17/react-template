/**
 * 任务调度器列表
 */

type Task = {
	id: number
	fn: () => void
	priority: number
}

export class TaskScheduler {
	private taskQueue: Task[] = []
	private taskId: number = 0
	private lastTimestamp: number = 0
	private targetDelay: number = 1000 / 60 // 目标帧率为60fps

	constructor() {
		this.start()
	}

	/**
	 * 添加任务
	 * @description 添加任务至调度器列表
	 * @param fn 回调执行
	 * @param priority 优先级
	 * @returns
	 */
	addTask(fn: () => void, priority?: number): number {
		const task: Task = {
			id: this.taskId++,
			fn,
			priority: priority || 0
		}
		this.taskQueue.push(task)
		this.sortTasks()
		return task.id
	}

	/**
	 * 移除任务
	 * @description 根据任务id移除任务
	 * @param id 任务id
	 */
	removeTask(id: number) {
		this.taskQueue = this.taskQueue.filter((task) => task.id !== id)
	}

	/**
	 * 排序任务
	 */
	private sortTasks() {
		this.taskQueue.sort((a, b) => b.priority - a.priority)
	}

	/**
	 * 执行任务
	 * @description 执行传入的task
	 * @param task 任务
	 * @param timestamp 时间戳
	 */
	private executeTask(task: Task, timestamp: number) {
		const delay = timestamp - this.lastTimestamp
		if (delay >= this.targetDelay) {
			task.fn()
			this.lastTimestamp = timestamp
		}
	}

	/**
	 * 启动调度器
	 */
	private start() {
		const loop = () => {
			const idleCallback = (deadline: IdleDeadline) => {
				// 在浏览器空闲时执行任务
				while (deadline.timeRemaining() > 0 && this.taskQueue.length > 0) {
					const task = this.taskQueue.shift() // 获取并移除队列中的第一个任务
					if (task) {
						task.fn() // 执行任务
					}
				}
				// 如果还有任务，继续请求下一个空闲时间
				if (this.taskQueue.length > 0) {
					requestIdleCallback(idleCallback)
				}
			}

			requestIdleCallback(idleCallback)
		}

		loop() // 启动循环
	}

	/**
	 * 打印调度器任务列表
	 */
	printTaskList() {
		console.log(this.taskQueue)
	}
}

// 性能测试
// const scheduler = new TaskScheduler()
// const totalOperations = 500000

// console.time('DOM操作耗时')

// // 使用 DocumentFragment 批量处理 DOM 操作
// const fragment = document.createDocumentFragment()

// for (let i = 0; i < totalOperations; i++) {
// 	scheduler.addTask(() => {
// 		const element = document.createElement('div')
// 		element.textContent = `Item ${i}`
// 		fragment.appendChild(element) // 将元素添加到 DocumentFragment
// 	})
// }

// // 在所有任务添加完成后，将 DocumentFragment 一次性插入到 DOM 中
// scheduler.addTask(() => {
// 	document.body.appendChild(fragment)
// })

// console.timeEnd('DOM操作耗时')
