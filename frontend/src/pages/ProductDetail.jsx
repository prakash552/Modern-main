import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../data/data';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [error, setError] = useState('');

  // Mock additional product details for trust building
  const productDetails = {
    1: {
      material: '100% Premium Cotton',
      care: 'Machine wash cold, tumble dry low',
      fit: 'Regular fit',
      features: ['Breathable fabric', 'Button-down collar', 'Chest pocket'],
      sizeGuide: 'Refer to size chart below',
      warranty: '30-day satisfaction guarantee'
    },
    2: {
      material: '98% Cotton, 2% Elastane',
      care: 'Machine wash in cold water, line dry',
      fit: 'Slim fit',
      features: ['Stretch fabric', 'Five-pocket design', 'Button fly'],
      sizeGuide: 'Refer to size chart below',
      warranty: '30-day satisfaction guarantee'
    },
    3: {
      material: 'Wool blend fabric',
      care: 'Dry clean only',
      fit: 'Tailored fit',
      features: ['Two-button closure', 'Lined interior', 'Side vents'],
      sizeGuide: 'Refer to size chart below',
      warranty: '30-day satisfaction guarantee'
    }
    // Add more product details as needed
  };

  useEffect(() => {
    const products = getAllProducts();
    const foundProduct = products.find(p => p.id === parseInt(productId));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Product not found, redirect to home
      navigate('/');
    }
  }, [productId, navigate]);

  useEffect(() => {
    // reset selected image when product changes
    setSelectedImage(0);
  }, [product]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

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

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setError('Please select a size');
      return;
    }
    addToCart({ ...product, selectedSize }, quantity);
  };

  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setError('Please select a size');
      return;
    }
    addToCart({ ...product, selectedSize }, quantity);
    // You could also navigate directly to a checkout page here if it existed
  };

  const productInfo = productDetails[product.id] || {};

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Back to Products
          </button>
        </div>

        <div className="product-detail-content">
          {/* Product Images Section */}
          <div className="product-images-section">
            <div className="main-image">
              {/* support product.images array, fall back to single image */}
              {(() => {
                const images = product.images || [product.image, product.image, product.image];
                return (
                  <>
                    <img
                      key={images[selectedImage]}
                      src={images[selectedImage]}
                      alt={`${product.name} - view ${selectedImage + 1}`}
                      className="main-product-image animated-main"
                    />
                    {product.originalPrice > product.price && (
                      <div className="discount-badge-large">
                        -{calculateDiscount(product.price, product.originalPrice)}%
                      </div>
                    )}

                    <div className="thumbnail-row">
                      {images.slice(0, 3).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`${product.name} thumb ${i + 1}`}
                          className={`thumbnail ${i === selectedImage ? 'active' : ''}`}
                          onClick={() => setSelectedImage(i)}
                        />
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <span className="badge-icon">✓</span>
                <span>Authentic Products</span>
              </div>
              <div className="trust-badge">
                <span className="badge-icon">🚚</span>
                <span>Free Shipping</span>
              </div>
              <div className="trust-badge">
                <span className="badge-icon">↩️</span>
                <span>Easy Returns</span>
              </div>
              <div className="trust-badge">
                <span className="badge-icon">🔒</span>
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating">
              {renderStars(product.rating)}
              <span className="review-link">({product.reviews} customer reviews)</span>
            </div>

            <div className="price-section">
              <span className="current-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
              )}
              <span className="you-save">
                You save ₹{(product.originalPrice - product.price).toLocaleString()}
              </span>
            </div>

            {/* Product Highlights */}
            <div className="product-highlights">
              <h3>Why You'll Love It:</h3>
              <ul>
                <li>Premium quality materials</li>
                <li>Comfortable and durable design</li>
                <li>Perfect for {product.category} fashion</li>
                <li>Excellent customer satisfaction</li>
              </ul>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="size-selector">
                <div className="size-header">
                  <h4>Select Size:</h4>
                  {error && <span className="size-error">{error}</span>}
                </div>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedSize(size);
                        setError('');
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <h4>Quantity:</h4>
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="add-to-cart-btn-large" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            {/* Product Details Tabs */}
            <div className="product-tabs">
              <div className="tab-headers">
                <button
                  className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specifications')}
                >
                  Specifications
                </button>
                <button
                  className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews ({product.reviews})
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'description' && (
                  <div className="tab-panel">
                    <p>
                      Experience premium comfort and style with our {product.name}.
                      Crafted with attention to detail and quality materials, this product
                      is designed to elevate your {product.category} wardrobe.
                    </p>
                    <p>
                      Perfect for any occasion, this piece combines functionality with
                      contemporary design to keep you looking and feeling your best.
                    </p>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="tab-panel">
                    <div className="specifications-grid">
                      <div className="spec-item">
                        <span className="spec-label">Material:</span>
                        <span className="spec-value">{productInfo.material || 'Premium fabric'}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Care Instructions:</span>
                        <span className="spec-value">{productInfo.care || 'Follow standard care guidelines'}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Fit:</span>
                        <span className="spec-value">{productInfo.fit || 'Standard fit'}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Features:</span>
                        <span className="spec-value">
                          {productInfo.features ? productInfo.features.join(', ') : 'Premium quality'}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Warranty:</span>
                        <span className="spec-value">{productInfo.warranty || 'Standard warranty'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="tab-panel">
                    <div className="reviews-summary">
                      <div className="avg-rating">
                        <span className="rating-number">{product.rating}</span>
                        <div className="stars-large">
                          {renderStars(product.rating)}
                        </div>
                        <span className="total-reviews">{product.reviews} reviews</span>
                      </div>

                      <div className="review-stats">
                        <div className="stat-bar">
                          <span>5 ★</span>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '70%' }}></div>
                          </div>
                          <span>70%</span>
                        </div>
                        <div className="stat-bar">
                          <span>4 ★</span>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '20%' }}></div>
                          </div>
                          <span>20%</span>
                        </div>
                        <div className="stat-bar">
                          <span>3 ★</span>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '7%' }}></div>
                          </div>
                          <span>7%</span>
                        </div>
                        <div className="stat-bar">
                          <span>2 ★</span>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '2%' }}></div>
                          </div>
                          <span>2%</span>
                        </div>
                        <div className="stat-bar">
                          <span>1 ★</span>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '1%' }}></div>
                          </div>
                          <span>1%</span>
                        </div>
                      </div>
                    </div>

                    <div className="sample-reviews">
                      <h4>Top Reviews</h4>
                      <div className="review-card">
                        <div className="review-header">
                          <div className="reviewer">
                            <span className="reviewer-name">Sarah M.</span>
                            <div className="review-stars">★★★★★</div>
                          </div>
                          <span className="review-date">2 weeks ago</span>
                        </div>
                        <p className="review-text">
                          "Absolutely love this product! The quality is exceptional and
                          it fits perfectly. Would definitely recommend to others."
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products-section">
          <h2>You Might Also Like</h2>
          <div className="related-products-grid">
            {/* This would show related products from the same category */}
            <div className="placeholder-related">
              Related products will appear here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;