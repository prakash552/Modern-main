import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Men.css';
import { productsData } from '../data/data';
import Products from '../components/Products';

const Men = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Get filtered products
  const getProducts = () => {
    return productsData.men || [];
  };

  const displayProducts = getProducts();

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

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="men-page">
      {/* Hero Section */}
      <section className="men-hero">
        <div className="men-overlay"></div>
        <div className="men-content">
          <h1 className="men-title">MEN'S COLLECTION</h1>
          <p className="men-subtitle">Premium Fashion for the Modern Gentleman</p>
        </div>
      </section>

      {/* Products Section - shared component */}
      <Products category="men" />
    </div>
  );
};

export default Men;