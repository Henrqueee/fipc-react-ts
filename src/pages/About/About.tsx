import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './About.module.css';
import Card from '../../components/Card/Card';
import { CTAButton } from '../../components/UI/Buttons/Buttons';
import { Title, Text } from '../../components/UI/Typography';

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToQuery = () => {
    navigate('/');
    setTimeout(() => {
      const searchSection = document.querySelector('[class*="searchSection"]');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className={styles.about}>
      {/* Hero Section - Storytelling Approach */}
      <section className={styles.heroStory}>
        <div className="container">
          <div className={styles.storyIntro}>
            <div className={styles.storyBadge}>
              <span className={styles.badgeText}>Since 1973</span>
            </div>
            <Title variant="hero" className={styles.storyTitle}>
               50 Years of Trust
             </Title>
            <Text variant="body" onHeroStory={true} className={styles.storyLead}>
                From a small research foundation to Brazil's most authoritative voice in vehicle pricing
              </Text>
            <div className={styles.storyTimeline}>
              <div className={styles.timelineItem}>
                 <div className={styles.timelineYear}>1973</div>
                 <div className={styles.timelineContent}>
                   <Text variant="body" onHeroStory={true} className={styles.timelineText1}>
                     FIPE Foundation established
                   </Text>
                 </div>
               </div>
               <div className={styles.timelineItem}>
                 <div className={styles.timelineYear}>1980s</div>
                 <div className={styles.timelineContent}>
                   <Text variant="body" onHeroStory={true} className={styles.timelineText2}>
                     First vehicle price tables
                   </Text>
                 </div>
               </div>
               <div className={styles.timelineItem}>
                 <div className={styles.timelineYear}>2024</div>
                 <div className={styles.timelineContent}>
                   <Text variant="body" onHeroStory={true} className={styles.timelineText3}>
                     Digital transformation with FIPE Query
                   </Text>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <div className="container">

          {/* Story Section */}
          <section className={styles.storySection}>
            <div className={styles.storyContent}>
              <div className={styles.storyText}>
                <Title variant="section">The FIPE Story</Title>
                <Text>
                  Since 1973, the FIPE Foundation has been the cornerstone of vehicle 
                  valuation in Brazil. What started as a research initiative became 
                  the most trusted reference for millions of transactions.
                </Text>
              </div>
              <div className={styles.storyStats}>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>1973</span>
                  <span className={styles.statLabel}>Founded</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>50+</span>
                  <span className={styles.statLabel}>Years</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>1M+</span>
                  <span className={styles.statLabel}>Monthly Queries</span>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className={styles.missionSection}>
            <div className={styles.missionContent}>
              <Title variant="section">Our Mission</Title>
              <Text>
                We're building the most reliable platform to check vehicle prices, 
                making FIPE data accessible to everyone, anywhere, anytime.
              </Text>
            </div>
          </section>

          {/* Features Grid */}
          <section className={styles.featuresSection}>
            <Title variant="section">Why Choose FIPE Query?</Title>
            <div className={styles.featuresGrid}>
              <Card
                icon="🏛️"
                title="Official Data"
                description="Direct access to FIPE Foundation's official database"
                animated={true}
                animationDelay={0}
              />
              <Card
                icon="⚡"
                title="Instant Results"
                description="Get vehicle prices in seconds, not minutes"
                animated={true}
                animationDelay={0.2}
              />
              <Card
                icon="🆓"
                title="Always Free"
                description="Unlimited queries at no cost, forever"
                animated={true}
                animationDelay={0.4}
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <Title variant="section" onDark={true}>Ready to Check Vehicle Prices?</Title>
              <Text onDark={true}>
                Get instant access to official FIPE prices for any vehicle in Brazil.
              </Text>
              <CTAButton 
                onClick={handleGoToQuery}
              >
                Start Your Search
              </CTAButton>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;