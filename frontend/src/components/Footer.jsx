import React, { useState } from 'react';
import FAQ from './FAQ';
import './Footer.css';

const Footer = ({ onPageChange }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      {/* FAQ Section Integrated into Footer */}
      <FAQ />

      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <h3>ELEVATE</h3>
              <p className="tagline">Premium Fashion & Lifestyle</p>
            </div>
            <p className="company-description">
              Discover the perfect blend of style and comfort with our curated collections for men, women, and kids. Experience luxury that elevates your everyday.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" title="Facebook">f</a>
              <a href="#" className="social-icon" title="Instagram">i</a>
              <a href="#" className="social-icon" title="Twitter">𝕏</a>
              <a href="#" className="social-icon" title="WhatsApp">w</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onPageChange('home'); }}>Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Collections */}
          <div className="footer-section">
            <h4 className="footer-title">Collections</h4>
            <ul className="footer-links">
              <li><a href="#men" onClick={(e) => { e.preventDefault(); onPageChange('men'); }}>Men</a></li>
              <li><a href="#women" onClick={(e) => { e.preventDefault(); onPageChange('women'); }}>Women</a></li>
              <li><a href="#kids" onClick={(e) => { e.preventDefault(); onPageChange('kids'); }}>Kids</a></li>
              <li><a href="#new">New Arrivals</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#shipping">Shipping & Delivery</a></li>
              <li><a href="#returns">Returns & Exchange</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#track">Track Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter-section">
            <h4 className="footer-title">Newsletter</h4>
            <p className="newsletter-text">
              Get exclusive updates, new collections, and special discounts delivered to your inbox.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="email-input-group">
                <input
                  type="email"
                  placeholder="ji676349@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="subscribe-btn">
                  {subscribed ? '✓' : 'Join'}
                </button>
              </div>
            </form>
            {subscribed && (
              <div className="success-message">
                ✓ Welcome to our community!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-bottom-section">
            <p className="copyright">
              &copy; 2025 <span className="brand-name">ELEVATE</span>. All rights reserved.
            </p>
          </div>

          <div className="footer-bottom-section payment-methods">
            <span className="payment-text">Payment Methods:</span>
            <div className="payment-icons">
              <span className="payment-icon" title="Credit/Debit Card">💳</span>
              <span className="payment-icon" title="UPI">🏦</span>
            </div>
          </div>

          <div className="footer-bottom-section made-by">
            <p className="made-text">
              Crafted with <span className="heart">✨</span> for excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
