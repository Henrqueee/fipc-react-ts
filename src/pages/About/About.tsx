import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './About.module.css';
import Card from '../../components/Card/Card';
import { CTAButton } from '../../components/UI/Buttons/Buttons';
import { Title, Text, Heading } from '../../components/UI/Typography';

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
              <Text className={styles.badgeText}>Since 1973</Text>
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
                <Heading variant="large" level={2}>The FIPE Story</Heading>
                <Text>
                  Since 1973, the FIPE Foundation has been the cornerstone of vehicle 
                  valuation in Brazil. What started as a research initiative became 
                  the most trusted reference for millions of transactions.
                </Text>
              </div>
              <div className={styles.storyStats}>
                <div className={styles.statCard}>
                  <Text className={styles.statNumber}>1973</Text>
                  <Text className={styles.statLabel}>Founded</Text>
                </div>
                <div className={styles.statCard}>
                  <Text className={styles.statNumber}>50+</Text>
                  <Text className={styles.statLabel}>Years</Text>
                </div>
                <div className={styles.statCard}>
                  <Text className={styles.statNumber}>1M+</Text>
                  <Text className={styles.statLabel}>Monthly Queries</Text>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className={styles.missionSection}>
            <div className={styles.missionContent}>
              <Heading variant="large" level={2}>Our Mission</Heading>
              <Text>
                We're building the most reliable platform to check vehicle prices, 
                making FIPE data accessible to everyone, anywhere, anytime.
              </Text>
            </div>
          </section>

          {/* Features Grid */}
          <section className={styles.featuresSection}>
            <Heading variant="large" level={2}>Why Choose FIPE Query?</Heading>
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
              <Heading variant="large" level={2} onDark={true}>Ready to Check Vehicle Prices?</Heading>
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