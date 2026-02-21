import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Men from './pages/Men'
import Women from './pages/Women'
import Kids from './pages/Kids'
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/admin/Admin'
import AdminLogin from './pages/admin/AdminLogin'
import Footer from './components/Footer'
import Cart from './components/user/Cart'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const location = useLocation();
  const { isAdmin } = useAuth();

  // Jin pages par Navbar aur Footer nahi dikhana unka path yahan add karein
  const noLayoutPaths = ['/login', '/register', '/admin/login'];
  const hideLayout = noLayoutPaths.includes(location.pathname) || location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {/* Agar login/register/admin page nahi hai, tabhi Navbar aur Cart dikhao */}
      {!hideLayout && <Navbar />}
      {!hideLayout && <Cart />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/product/:productId" element={<ProductDetail />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={isAdmin ? <Admin /> : <AdminLogin />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Agar login/register/admin page nahi hai, tabhi Footer dikhao */}
      {!hideLayout && <Footer />}
    </div>
  )
}

export default App
