import { configureStore } from '@reduxjs/toolkit'
import counter from './module/counter'

const store = configureStore({
	reducer: {
		counter
	}
})

export default store
