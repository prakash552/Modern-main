import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Products.css';
import { getProductsByCategory } from '../data/data';

const Products = ({ category = null }) => {
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const navigate = useNavigate();
  const location = useLocation();

  // Read query param `search` from URL
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || null;

  // Determine effective category: prefer `category` prop; else use URL param if present; else activeCategory
  const effectiveCategory = category || urlCategory || activeCategory;

  // Get filtered products by category
  const displayProducts = getProductsByCategory(effectiveCategory || 'all');

  // Apply search from URL (case-insensitive). If no search, show all in category.
  const filteredProducts = displayProducts.filter((p) => {
    if (!urlSearch) return true;
    return p.name.toLowerCase().includes(urlSearch.trim().toLowerCase());
  });

  const renderStars = (rating) => {
    return (
      <div className="product-stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? 'filled' : 'empty'}>★</span>
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  const calculateDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleWishlistClick = (e, productId) => {
    e.stopPropagation();
    // Wishlist functionality here
    alert(`Added product ${productId} to wishlist!`);
  };

  return (
    <section className="products-section">
      <div className="products-container">
        {/* Header */}
        <div className="products-header">
          <h2>Our Collections</h2>
          <p>Discover our exclusive range of premium products</p>
        </div>


        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-card"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => handleProductClick(product.id)}
            >
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              </div>

              {/* Product Info - minimal luxury layout */}
              <div className="product-info product-info--luxury">
                <h3 className="product-name">{product.name}</h3>
                {renderStars(product.rating)}
                <div className="product-price">₹{product.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {displayProducts.length === 0 && (
          <div className="no-products">
            <p>No products found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;