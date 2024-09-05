import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'virtual:svg-icons-register'
import '@/style/index.css'

import App from './App.tsx'

createRoot(document.getElementById('app')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)

