import { useState } from 'react';
import './Categories.css';

export default function Categories() {
  const [hoveredId, setHoveredId] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'WOMEN',
      description: 'Elegant styles for the modern woman',
      count: '120+ Items',
      image: 'https://images.unsplash.com/photo-1724184888115-e76e42f53dcc?w=800&auto=format&fit=crop&q=80',
      color: '#FFB6C1',
      link: '/women',
      type: 'large'
    },
    {
      id: 2,
      name: 'MEN',
      description: 'Sophisticated essentials for him',
      count: '85+ Items',
      image: 'https://plus.unsplash.com/premium_photo-1661627681947-4431c8c97659?w=800&auto=format&fit=crop&q=80',
      color: '#87CEEB',
      link: '/men',
      type: 'medium'
    },
    {
      id: 3,
      name: 'KIDS',
      description: 'Comfortable fashion for the little ones',
      count: '45+ Items',
      image: 'https://images.unsplash.com/photo-1710646420894-660f1244710b?w=800&auto=format&fit=crop&q=80',
      color: '#F0E68C',
      link: '/kids',
      type: 'medium'
    }
  ];

  const handleCategoryClick = (link) => {
    window.location.href = link;
  };

  return (
    <section className="categories">
      {/* Dynamic Background */}
      <div className="categories-bg-glow"></div>

      <div className="categories-container">
        {/* Section Header */}
        <div className="section-header">
  
          <h2 className="section-title">THE COLLECTIONS</h2>
          <p className="section-subtitle">Redefining modern elegance through mindful design and exceptional craftsmanship.</p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card card-${category.type}`}
              onClick={() => handleCategoryClick(category.link)}
              style={{ '--i': category.id }}
            >
              <div className="category-image-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                <div className="category-overlay"></div>

                {/* Information Card (Glassmorphic) */}
                <div className="category-info-card">
                  <span className="category-count">{category.count}</span>
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-desc">{category.description}</p>
                  <div className="category-cta">
                    <span>EXPLORE NOW</span>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="category-accent-glow" style={{ background: category.color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
