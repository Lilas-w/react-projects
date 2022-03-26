import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// 8 将AppProvider导入index组件
import { AppProvider } from './context'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
