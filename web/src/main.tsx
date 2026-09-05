import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { loadCodes } from './lib/codes'
import './index.css'

// Fetch mã 1 lần khi mở web; lỗi thì dùng mã đã lưu / mặc định.
void loadCodes()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
