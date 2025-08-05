import React from 'react';
import styles from './About.module.css';
import Card from '../../components/Card/Card';

const About: React.FC = () => {
  return (
    <div className={styles.about}>
      <main className={styles.main}>
        <div className="container">
          <section className={styles.hero}>
            <h1 className={styles.title}>About FIPE Table</h1>
            <p className={styles.subtitle}>
              Understand how Brazil's main vehicle price reference works
            </p>
          </section>

          <section className={styles.content}>
            <div className={styles.contentLayout}>
              <div className={styles.textSection}>
                <h2>What is the FIPE Table?</h2>
                <p>
                  The FIPE Table (Foundation Institute for Economic Research) is a national reference 
                  for average vehicle prices in the Brazilian market. Created in 1973, it serves as 
                  the basis for negotiations, financing, and insurance for automobiles, motorcycles, and trucks.
                </p>
                
                <h3>How are prices calculated?</h3>
                <p>
                  Values are obtained through research conducted with dealerships, 
                  resellers, and other automotive market data sources. The methodology 
                  ensures that prices reflect real market conditions.
                </p>

                <h3>Update frequency</h3>
                <p>
                  The table is updated monthly, always in the first half of the month, 
                  ensuring that values are always aligned with market fluctuations.
                </p>
              </div>

              <div className={styles.statsSection}>
                <Card
                  icon="📅"
                  title="50+"
                  description="Years of tradition"
                  animated={true}
                  animationDelay={0}
                />
                <Card
                  icon="💯"
                  title="100%"
                  description="Free"
                  animated={true}
                  animationDelay={0.2}
                />
                <Card
                  icon="🚗"
                  title="1000+"
                  description="Registered models"
                  animated={true}
                  animationDelay={0.4}
                />
              </div>
            </div>

            <div className={styles.featuresSection}>
              <h2>Why use the FIPE Table?</h2>
              <div className={styles.featuresList}>
                <Card
                  icon="🏛️"
                  title="National Reference"
                  description="Accepted by banks, insurance companies, and dealerships throughout the country"
                  animated={true}
                  animationDelay={0}
                />
                <Card
                  icon="📊"
                  title="Reliable Data"
                  description="Rigorous methodology based on market research"
                  animated={true}
                  animationDelay={0.2}
                />
                <Card
                  icon="🔄"
                  title="Constant Updates"
                  description="Values updated monthly to reflect the current market"
                  animated={true}
                  animationDelay={0.4}
                />
                <Card
                  icon="🆓"
                  title="Free Access"
                  description="Unlimited queries at no cost"
                  animated={true}
                  animationDelay={0.6}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;