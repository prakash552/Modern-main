import React from 'react';
import './Images.css';

const Images = () => {
  // Using placeholder images from Unsplash API
  const images = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1765796513222-1b58f1d9581f?w=1200&h=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNsb3RoJTIwbW9kZWx8ZW58MHx8MHx8fDA%3D',
      title: 'Architectural Design',
      size: 'large'
    },
    {
      id: 2,
      url: 'https://plus.unsplash.com/premium_photo-1768500517064-b8d520a548c8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGNsb3RoJTIwbW9kZWx8ZW58MHx8MHx8fDA%3D',
      title: 'Modern Style',
      size: 'small'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1629405420109-20caf398fd7d?w=600&h=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vZGVsJTIwaW5kaWFuJTIwbWVufGVufDB8fDB8fHww',
      title: 'Premium Quality',
      size: 'medium'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9ybWFsJTIwbWFufGVufDB8fDB8fHww',
      title: 'Elegant Look',
      size: 'medium'
    },

  ];

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2>Gallery</h2>
          <p>Explore our stunning collection</p>
        </div>
        
        <div className="gallery-grid">
          {/* First Row - Large + Small */}
          <div 
            className="gallery-item large"
            style={{ animationDelay: '0s' }}
          >
            <div className="gallery-image-wrapper">
              <img 
                src={images[0].url} 
                alt={images[0].title}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <p className="gallery-title">{images[0].title}</p>
              </div>
            </div>
          </div>

          <div 
            className="gallery-item small"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="gallery-image-wrapper">
              <img 
                src={images[1].url} 
                alt={images[1].title}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <p className="gallery-title">{images[1].title}</p>
              </div>
            </div>
          </div>

          {/* Second Row - 3 Medium Images */}
          {images.slice(2, 5).map((image, index) => (
            <div 
              key={image.id}
              className="gallery-item medium"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <div className="gallery-image-wrapper">
                <img 
                  src={image.url} 
                  alt={image.title}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <p className="gallery-title">{image.title}</p>
                </div>
              </div>
            </div>
          ))}


        </div>
      </div>
    </section>
  );
};

export default Images;
