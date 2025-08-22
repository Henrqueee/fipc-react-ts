import React from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import Carousel from '../../components/Carousel/Carousel';
import Card from '../../components/Card/Card';
import { CTAButton } from '../../components/UI/Buttons/Buttons';
import { Title, Text, Heading, Subtitle } from '../../components/UI/Typography';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const scrollToSearch = () => {
    const searchSection = document.querySelector(`.${styles.searchSection}`);
    
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
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
        <div className={styles.parallaxBg} />
        <div className={styles.heroContent}>
          <div className="container">
            <div className={styles.heroText}>
              <Title variant="hero" className={styles.title}>
                FIPE Query
              </Title>
              <Subtitle variant="hero">
                Check the average price of vehicles in the national market
              </Subtitle>
              <div className={styles.heroStats}>
                <div className={styles.statItem}>
                  <Text className={styles.statNumber}>100K+</Text>
                  <Text variant="stat-label" className={styles.statLabel}>Queries completed</Text>
                </div>
                <div className={styles.statItem}>
                  <Text className={styles.statNumber}>24/7</Text>
                  <Text variant="stat-label" className={styles.statLabel}>Always available</Text>
                </div>
                <div className={styles.statItem}>
                  <Text className={styles.statNumber}>100%</Text>
                  <Text variant="stat-label" className={styles.statLabel}>Official data</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <div className="container">
          {/* Search Section */}
          <section className={styles.searchSection}>
            <div className={styles.searchWrapper}>
              <Heading variant="large" level={2} className={styles.sectionTitle}>Make your query</Heading>
              <SearchForm />
            </div>
          </section>
          
          {/* Features Section with animation */}
          <section className={styles.featuresSection}>
            <div className={styles.featuresHeader}>
              <Heading variant="large" level={2} className={styles.sectionTitle}>Why choose FIPE Query?</Heading>
              <Subtitle variant="section">
                The most reliable way to check vehicle prices
              </Subtitle>
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
            <div className={styles.parallaxImage} />
            <div className={styles.parallaxContent}>
              <Heading variant="large" level={2}>Technology and Reliability</Heading>
              <Text variant="parallax">
                Our platform uses the most recent data from the FIPE table, 
                ensuring accuracy and reliability in every query.
              </Text>
              <div className={styles.techFeatures}>
                <div className={styles.techItem}>
                  <span className={styles.techIcon}>🔒</span>
                  <Text variant="tech-feature">Secure</Text>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techIcon}>⚡</span>
                  <Text variant="tech-feature">Fast</Text>
                </div>
                <div className={styles.techItem}>
                  <span className={styles.techIcon}>📱</span>
                  <Text variant="tech-feature">Responsive</Text>
                </div>
              </div>
            </div>
          </section>

          {/* Vehicle Types Section with Carousel */}
          <section className={styles.vehicleTypesSection}>
            <div className={styles.container}>
              <Heading variant="large" level={2} className={styles.sectionTitle}>Vehicle Types</Heading>
              <Subtitle variant="section">
                Check prices for all types of vehicles
              </Subtitle>
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
            <Heading variant="large" level={2}>Ready to discover your vehicle's value?</Heading>
            <Text variant="parallax">Make your query now and get access to official FIPE data</Text>
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