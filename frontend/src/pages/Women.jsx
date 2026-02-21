import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Women.css';
import Products from '../components/Products';

const Women = () => {
  const navigate = useNavigate();

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