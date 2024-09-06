import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'virtual:svg-icons-register'
import '@/style/index.css'

import { Provider } from 'react-redux'
import store from './store'

import App from './App.tsx'

createRoot(document.getElementById('app')!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
)

