import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import AppState from './context/AppState.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppState>
    <App />
  </AppState>
)