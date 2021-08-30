import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// 8 将AppProvider导入index组件
import { AppProvider } from './context'

ReactDOM.render(
  <React.StrictMode>
    {/* 9 使用<AppProvider>包裹<App /> */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
