import React, { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import Carousel from '../../components/Carousel/Carousel';
import Card from '../../components/Card/Card';
import { CTAButton } from '../../components/UI/Buttons/Buttons';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const scrollToSearch = () => {
    const searchSection = document.querySelector(`.${styles.searchSection}`);
    
    if (searchSection) {
      searchSection.scrollIntoView();
    }
  };

  // Vehicle data
  const vehicleTypes = [
    { icon: '🚗', title: 'Cars', description: 'National and imported', count: '+50,000 models' },
    { icon: '🏍️', title: 'Motorcycles', description: 'All engine sizes', count: '+15,000 models' },
    { icon: '🚚', title: 'Trucks', description: 'Light and heavy', count: '+8,000 models' },
    { icon: '🚐', title: 'Minibuses', description: 'Public transport', count: '+2,000 models' },
    { icon: '🚛', title: 'Utilities', description: 'Work and leisure', count: '+12,000 models' },
    { icon: '🏎️', title: 'Sports Cars', description: 'High performance', count: '+3,000 models' }
  ];

  return (
    <div className={styles.home}>
      <section className={styles.heroParallax}>
        <div 
          className={styles.parallaxBg}
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className={styles.heroContent}>
          <div className="container">
            <div className={styles.heroText}>
              <h1 className={styles.title}>
                FIPE Query
              </h1>
              <p className={styles.subtitle}>
                Check the average price of vehicles in the national market
              </p>
              <div className={styles.heroStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>100K+</span>
                  <span className={styles.statLabel}>Queries completed</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>24/7</span>
                  <span className={styles.statLabel}>Always available</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>100%</span>
                  <span className={styles.statLabel}>Official data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.scrollIndicator} onClick={scrollToSearch}>
          <div className={styles.scrollArrow}></div>
        </div>
      </section>

      <main className={styles.main}>
        <div className="container">
          {/* Search Section */}
          <section className={styles.searchSection}>
            <div className={styles.searchWrapper}>
              <h2 className={styles.sectionTitle}>Make your query</h2>
              <SearchForm />
            </div>
          </section>
          
          {/* Features Section with animation */}
          <section className={styles.featuresSection}>
            <div className={styles.featuresHeader}>
              <h2 className={styles.sectionTitle}>Why choose FIPE Query?</h2>
              <p className={styles.sectionSubtitle}>
                The most reliable way to check vehicle prices
              </p>
            </div>
            
            <div className={styles.infoContainer}>
              <Card
              icon="📊"
              title="Detailed Analysis"
              description="Complete vehicle history and detailed technical information for informed decisions."
              animated={true}
              animationDelay={0}
            />
            <Card
              icon="💰"
              title="Best Prices"
              description="Competitive prices and exclusive offers from the best dealers in the country."
              animated={true}
              animationDelay={0.2}
            />
            <Card
              icon="⚡"
              title="Fast Process"
              description="Simplified search and quick contact with sellers. Find your ideal vehicle in minutes."
              animated={true}
              animationDelay={0.4}
            />
            </div>
          </section>

          {/* Parallax Section */}
          <section className={styles.parallaxSection}>
            <div 
              className={styles.parallaxImage}
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            />
            <div className={styles.parallaxContent}>
              <h2>Technology and Reliability</h2>
              <p>
                Our platform uses the most recent data from the FIPE table, 
                ensuring accuracy and reliability in every query.
              </p>
              <div className={styles.techFeatures}>
                <div className={styles.techItem}>
                  <span className={styles.techIcon}>🔒</span>
                  <span>Secure</span>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techIcon}>⚡</span>
                  <span>Fast</span>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techIcon}>📱</span>
                  <span>Responsive</span>
                </div>
              </div>
            </div>
          </section>

          {/* Vehicle Types Section with Carousel */}
          <section className={styles.vehicleTypesSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Vehicle Types</h2>
              <p className={styles.sectionSubtitle}>
                Check prices for all types of vehicles
              </p>
            </div>
            
            <Carousel 
              items={vehicleTypes}
              itemsPerSlide={3}
              autoPlay={true}
              autoPlayInterval={5000}
            />
          </section>

        </div>
      </main>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to discover your vehicle's value?</h2>
            <p>Make your query now and get access to official FIPE data</p>
            <CTAButton onClick={scrollToSearch}>
              Check Now
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;