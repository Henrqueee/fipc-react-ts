import React from 'react';
import Card from '../../components/Card/Card';
import { CTAButton } from '../../components/UI/Buttons/Buttons';
import { Title, Text } from '../../components/UI/Typography';
import { useAboutContent } from '../../hooks/useAboutContent';
import { useAboutActions } from '../../hooks/useAboutActions';
import { AboutDataService } from '../../services/aboutDataService';
import styles from './About.module.css';

export const About: React.FC = () => {
  const { storyContent, missionContent, features, ctaContent, isLoading } = useAboutContent();
  const { handleGoToQuery } = useAboutActions();

  const timelineData = AboutDataService.getTimelineData();
  const companyStats = AboutDataService.getCompanyStats();

  if (isLoading) {
    return (
      <div className={styles.aboutContainer}>
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <Title className={styles.heroTitle}>Loading...</Title>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <Title className={styles.heroTitle}>
            About FIPC
          </Title>
          <Text className={styles.heroSubtitle}>
            Driving innovation and technological development for over 35 years
          </Text>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Story Section */}
        <section className={styles.storySection}>
          <div className={styles.storyContent}>
            <Title className={styles.sectionTitle}>
              {storyContent?.title || 'Our Story'}
            </Title>
            <Text className={styles.storyText}>
              {storyContent?.firstParagraph}
            </Text>
            <Text className={styles.storyText}>
              {storyContent?.secondParagraph}
            </Text>
          </div>
        </section>

        {/* Timeline Section */}
        <section className={styles.timelineSection}>
          <Title className={styles.sectionTitle}>
            Our Journey
          </Title>
          <div className={styles.timeline}>
            {timelineData.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineContent}>
                  <Title className={styles.timelineTitle}>
                    {item.title}
                  </Title>
                  <Text className={styles.timelineDescription}>
                    {item.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.missionSection}>
          <div className={styles.missionContent}>
            <Title className={styles.sectionTitle}>
              {missionContent?.title || 'Our Mission'}
            </Title>
            <Text className={styles.missionText}>
              {missionContent?.description}
            </Text>
            <div className={styles.statsGrid}>
              {companyStats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className={styles.featuresSection}>
          <Title className={styles.sectionTitle}>
            What We Offer
          </Title>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Card key={index} className={styles.featureCard}>
                <Title className={styles.featureTitle}>
                  {feature.title}
                </Title>
                <Text className={styles.featureDescription}>
                  {feature.description}
                </Text>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <Title className={styles.ctaTitle}>
              {ctaContent.title}
            </Title>
            <Text className={styles.ctaDescription}>
              {ctaContent.description}
            </Text>
            <CTAButton 
              onClick={handleGoToQuery}
              className={styles.ctaButton}
            >
              {ctaContent.buttonText}
            </CTAButton>
          </div>
        </section>
      </main>
    </div>
  );
};