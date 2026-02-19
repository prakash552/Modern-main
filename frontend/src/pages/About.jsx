import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-overlay"></div>
        <div className="about-content">
          <h1 className="about-title">ABOUT ELEVATE</h1>
          <p className="about-subtitle">Where Style Meets Excellence</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title">Our Story</h2>
              <p className="story-paragraph">
                Founded with a vision to redefine modern fashion, ELEVATE began as a small boutique with big dreams. 
                What started as a passion project has grown into a premier destination for those who appreciate the 
                perfect fusion of style, quality, and comfort.
              </p>
              <p className="story-paragraph">
                Our journey has been fueled by a commitment to excellence and an unwavering dedication to our customers. 
                Every piece in our collection is carefully curated to reflect the sophisticated tastes of today's 
                fashion-forward individuals.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span>📸</span>
                <p>Our Journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To elevate everyday style through carefully curated collections that inspire confidence and express individuality.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">✨</div>
              <h3>Our Vision</h3>
              <p>To become the go-to destination for premium fashion that seamlessly blends luxury with accessibility.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💎</div>
              <h3>Our Values</h3>
              <p>Quality craftsmanship, sustainable practices, and exceptional customer experience drive everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <span>👤</span>
              </div>
              <h3>Alex Morgan</h3>
              <p className="member-role">Creative Director</p>
              <p className="member-bio">With over 10 years in fashion design, Alex brings innovative vision to every collection.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <span>👤</span>
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">Head of Merchandising</p>
              <p className="member-bio">Sarah's expertise ensures we deliver the perfect balance of style and quality.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <span>👤</span>
              </div>
              <h3>Michael Chen</h3>
              <p className="member-role">Customer Experience Lead</p>
              <p className="member-bio">Michael is dedicated to creating exceptional shopping experiences for our valued customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Brand Partnerships</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;