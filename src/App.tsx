import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Active from './pages/active';
import Package from './pages/package';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/active" element={<Active />} />
          <Route path="/package" element={<Package />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
