import MyChatBot from './components/MyChatBot'
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
import Orders from './pages/user/Orders'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const noLayoutPaths = ['/login', '/register', '/admin/login'];
  const hideLayout = noLayoutPaths.includes(location.pathname) || location.pathname.startsWith('/admin');

  return (
    <div className="App">
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

        {/* User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={user ? <Orders /> : <Login />} />
      </Routes>

      {!hideLayout && <Footer />}
      {!hideLayout && <MyChatBot />}
    </div>
  )
}

export default App
