import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

interface CarouselItem {
  icon: string;
  title: string;
  description: string;
  count: string;
}

interface CarouselProps {
  items: CarouselItem[];
  itemsPerSlide?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  itemsPerSlide = 3,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentSlide, autoPlay, autoPlayInterval]);

  return (
    <div className={`${styles.carouselContainer} ${className}`}>
      {/* Carousel Container */}
      <div className={styles.carouselWrapper}>
        <div 
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className={styles.carouselSlide}>
              {items.slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide).map((item, cardIndex) => (
                <div key={cardIndex} className={styles.carouselCard}>
                  <div className={styles.cardIcon}>{item.icon}</div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                  <span className={styles.cardCount}>{item.count}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;