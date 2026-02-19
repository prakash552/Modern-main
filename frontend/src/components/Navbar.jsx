import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link import kiya
import { IoSearch, IoBagHandle, IoPersonCircle, IoMenu, IoClose } from 'react-icons/io5';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount, toggleCart } = useCart();
  const { user, logout } = useAuth();

  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const desktopSearchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus management
  useEffect(() => {
    if (searchActive) {
      setTimeout(() => desktopSearchInputRef.current?.focus(), 100);
    }
  }, [searchActive]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (q) {
      navigate(`/?search=${encodeURIComponent(q)}`);
      setSearchActive(false);
      setSearchValue('');
      // Smooth scroll to products
      setTimeout(() => {
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Mobile Menu Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>

        {/* Left Section - Navigation */}
        <div className={`nav-left ${menuOpen ? 'mobile-open' : ''}`}>
          <button className="mobile-close-btn" onClick={() => setMenuOpen(false)}>
            <IoClose />
          </button>
          <ul className="nav-links">
            <li style={{ '--i': 1 }}><Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li style={{ '--i': 2 }}><Link to="/men" className="nav-link" onClick={() => setMenuOpen(false)}>Men</Link></li>
            <li style={{ '--i': 3 }}><Link to="/women" className="nav-link" onClick={() => setMenuOpen(false)}>Women</Link></li>
            <li style={{ '--i': 4 }}><Link to="/kids" className="nav-link" onClick={() => setMenuOpen(false)}>Kids</Link></li>
          </ul>
        </div>

        {/* Center Section - Logo */}
        <div className="nav-center">
          <Link to="/" className="logo-container">
            <h1 className="logo">ELEVATE</h1>
            <span className="logo-tagline">Excellence in Every Thread</span>
          </Link>
        </div>

        {/* Right Section - Search & Icons */}
        <div className="nav-right">
          {/* Desktop Search */}
          <div className={`search-wrapper ${searchActive ? 'active' : ''}`}>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                ref={desktopSearchInputRef}
                type="text"
                placeholder="Search collection..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={() => !searchValue && setSearchActive(false)}
              />
              <button type="submit" className="search-submit">
                <IoSearch />
              </button>
            </form>
          </div>

          <div className="action-icons">
            <button
              className={`icon-btn search-trigger ${searchActive ? 'hidden' : ''}`}
              onClick={() => setSearchActive(true)}
              aria-label="Search"
            >
              <IoSearch />
            </button>

            <div className="icon-wrapper cart-trigger" onClick={toggleCart}>
              <IoBagHandle className="icon" />
              {cartCount > 0 && (
                <span className="cart-badge animate-pop">{cartCount}</span>
              )}
            </div>

            <div className="icon-wrapper user-account">
              {user ? (
                <div className="user-logged-in">
                  <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
                  <div className="user-avatar-wrapper">
                    <IoPersonCircle className="icon active" />
                    <div className="account-dropdown">
                      <div className="dropdown-header">
                        <p className="dropdown-user-email">{user.email}</p>
                      </div>
                      <Link to="/profile" className="dropdown-item">My Account</Link>
                      <Link to="/orders" className="dropdown-item">Order History</Link>
                      <button onClick={logout} className="dropdown-item logout-link">Sign Out</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="user-guest" onClick={() => navigate('/login')}>
                  <IoPersonCircle className="icon" />
                  <span className="login-text">Sign In</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
