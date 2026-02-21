import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Kids.css';
import Products from '../components/Products';

const Kids = () => {
  const navigate = useNavigate();

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