import { useState } from 'react';
import './Categories.css';

export default function Categories() {
  const [hoveredId, setHoveredId] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'WOMEN',
      image: 'https://images.unsplash.com/photo-1724184888115-e76e42f53dcc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xvdGhpbmclMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D',
      color: '#FFB6C1',
      link: '/women'
    },
    {
      id: 2,
      name: 'MEN',
      image: 'https://plus.unsplash.com/premium_photo-1661627681947-4431c8c97659?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI1fHxtb2RlbCUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D',
      color: '#87CEEB',
      link: '/men'
    },
    {
      id: 3,
      name: 'KIDS',
      image: 'https://images.unsplash.com/photo-1710646420894-660f1244710b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGtpZHMlMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D',
      color: '#F0E68C',
      link: '/kids'
    },
    {
      id: 4,
      name: 'ACCESSORIES',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop',
      color: '#FFE4B5',
      link: '/accessories'
    }
  ];

  const handleCategoryClick = (link) => {
    window.location.href = link;
  };

  return (
    <section className="categories">
      <div className="categories-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">EXPLORE OUR COLLECTIONS</h2>
          <p className="section-subtitle">Discover the latest trends and timeless classics</p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${hoveredId === category.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleCategoryClick(category.link)}
            >
              {/* Image Container */}
              <div className="category-image-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                <div className="category-overlay"></div>
                <div className="category-name-overlay">{category.name}</div>
                <div className="category-accent" style={{ background: category.color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="categories-decoration"></div>
    </section>
  );
}
