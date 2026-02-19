import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Men from './pages/Men'
import Women from './pages/Women'
import Kids from './pages/Kids'
import ProductDetail from './pages/ProductDetail'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  const location = useLocation();

  // Jin pages par Navbar aur Footer nahi dikhana unka path yahan add karein
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      {/* Agar login/register page nahi hai, tabhi Navbar aur Cart dikhao */}
      {!hideLayout && <Navbar />}
      {!hideLayout && <Cart />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Agar login/register page nahi hai, tabhi Footer dikhao */}
      {!hideLayout && <Footer />}
    </div>
  )
}

export default App
