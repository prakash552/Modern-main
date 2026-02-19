import { useState, useEffect } from 'react';
import './Hero.css';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1764583429911-267af56f4707?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHN1bW1lciUyMGNsb3RofGVufDB8fDB8fHww',

    },
    {
      id: 2,

      image: 'https://images.unsplash.com/photo-1642912274667-457912db4ed3?w=1200&auto=format&fit=crop&q=90&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdvbWVuJTIwbW9kZWxzfGVufDB8fDB8fHww',

    },
    {
      id: 3,

      image: 'https://images.unsplash.com/photo-1738928150551-05dba4be886e?w=1200&auto=format&fit=crop&q=90&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQxfHx0d28lMjBtZW4lMjBtb2RlbHN8ZW58MHx8MHx8fDA%3D',

    },
  ];

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoplay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
  };

  return (
    <section className="hero">
      {/* Slides Container */}
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <span className="slide-category">{slide.category}</span>

            </div>
          </div>
        ))}
      </div>


      {/* Dots Navigation */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Autoplay Toggle */}
      <button
        className="autoplay-toggle"
        onClick={() => setIsAutoplay(!isAutoplay)}
        title={isAutoplay ? 'Pause' : 'Play'}
      >
        {isAutoplay ? '⏸' : '▶'}
      </button>
    </section>
  );
}
