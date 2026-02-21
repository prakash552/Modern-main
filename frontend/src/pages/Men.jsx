import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Men.css';
import Products from '../components/Products';

const Men = () => {
  const navigate = useNavigate();

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