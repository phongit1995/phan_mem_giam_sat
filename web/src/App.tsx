import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PackagePage from './pages/PackagePage'
import ActivePage from './pages/ActivePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/package" element={<PackagePage />} />
      <Route path="/active" element={<ActivePage />} />
    </Routes>
  )
}

export default App
