import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <CartProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </CartProvider>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
);
