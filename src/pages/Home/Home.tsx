import React from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import Carousel from '../../components/Carousel/Carousel';
import Card from '../../components/Card/Card';
import { CTAButton } from '../../components/UI/Buttons/Buttons';
import { Title, Text, Heading, Subtitle } from '../../components/UI/Typography';
import { HomeDataService } from '../../services';
import { useScrollToSection } from '../../hooks';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const { scrollToSection } = useScrollToSection();
  const vehicleTypes = HomeDataService.getVehicleTypes();
  const heroStats = HomeDataService.getHeroStats();

  const scrollToSearch = () => {
    scrollToSection(styles.searchSection);
  };

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
                {heroStats.map((stat, index) => (
                  <div key={index} className={styles.statItem}>
                    <Text className={styles.statNumber}>{stat.number}</Text>
                    <Text variant="stat-label" className={styles.statLabel}>{stat.label}</Text>
                  </div>
                ))}
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