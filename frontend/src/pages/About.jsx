import React, { useEffect, useRef, useState } from 'react';
import {
  FaRocket, FaEye, FaGem,
  FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = {
    story: useRef(null),
    mission: useRef(null),
    stats: useRef(null)
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-content">
          <h1 className="about-title">About Elevate</h1>
          <p className="about-subtitle">Redefining Modern Excellence</p>
        </div>
      </section>

      {/* Story Section */}
      <section
        id="story"
        ref={sectionRefs.story}
        className="about-story section-padding"
      >
        <div className="container">
          <div className="story-grid">
            <div className={`story-text-content ${visibleSections.story ? 'visible' : ''}`}>
              <span className="section-tag">Our Legacy</span>
              <h2 className="section-title">A Journey of Style & <br />Unwavering Passion</h2>
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
            <div className="story-visual">
              <img
                src="https://images.unsplash.com/photo-1649820942124-28b5d111a5d2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Our Atelier"
                className="story-image-main"
              />
              <div className="story-experience-badge">
                <span className="exp-num">10+</span>
                <span className="exp-text">Years of Craft</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        ref={sectionRefs.mission}
        className="about-mission section-padding"
      >
        <div className="container">
          <div className="mission-grid">
            <div className={`mission-card ${visibleSections.mission ? 'visible' : ''}`}>
              <div className="mission-icon"><FaRocket /></div>
              <h3>Our Mission</h3>
              <p>To elevate everyday style through carefully curated collections that inspire confidence and express individuality.</p>
            </div>
            <div className={`mission-card ${visibleSections.mission ? 'visible' : ''}`}>
              <div className="mission-icon"><FaEye /></div>
              <h3>Our Vision</h3>
              <p>To become the global destination for luxury fashion that remains accessible without compromising on integrity.</p>
            </div>
            <div className={`mission-card ${visibleSections.mission ? 'visible' : ''}`}>
              <div className="mission-icon"><FaGem /></div>
              <h3>Our Values</h3>
              <p>Quality craftsmanship, sustainable practices, and exceptional customer experience drive everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        ref={sectionRefs.stats}
        className="about-stats"
      >
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-num">5k+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">50+</span>
              <span className="stat-label">Showrooms</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">120+</span>
              <span className="stat-label">Styles</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Quality</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;