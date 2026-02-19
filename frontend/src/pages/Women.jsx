import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Women.css';
import { productsData } from '../data/data';
import Products from '../components/Products';

const Women = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Get filtered products
  const getProducts = () => {
    return productsData.women || [];
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
    <div className="women-page">
      {/* Hero Section */}
      <section className="women-hero">
        <div className="women-overlay"></div>
        <div className="women-content">
          <h1 className="women-title">WOMEN'S COLLECTION</h1>
          <p className="women-subtitle">Elegant Fashion for the Modern Woman</p>
        </div>
      </section>

      {/* Products Section - shared component */}
      <Products category="women" />
    </div>
  );
};

export default Women;