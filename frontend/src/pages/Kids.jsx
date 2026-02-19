import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kids.css';
import { productsData } from '../data/data';
import Products from '../components/Products';

const Kids = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Get filtered products
  const getProducts = () => {
    return productsData.kids || [];
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
    <div className="kids-page">
      {/* Hero Section */}
      <section className="kids-hero">
        <div className="kids-overlay"></div>
        <div className="kids-content">
          <h1 className="kids-title">KIDS' COLLECTION</h1>
          <p className="kids-subtitle">Adorable Fashion for Little Ones</p>
        </div>
      </section>

      {/* Products Section - shared component */}
      <Products category="kids" />
    </div>
  );
};

export default Kids;