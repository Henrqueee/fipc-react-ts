import React from 'react';
import styles from './About.module.css';

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
            <div className={styles.contentGrid}>
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
                <div className={styles.statCard}>
                  <h3>50+</h3>
                  <p>Years of tradition</p>
                </div>
                <div className={styles.statCard}>
                  <h3>100%</h3>
                  <p>Free</p>
                </div>
                <div className={styles.statCard}>
                  <h3>1000+</h3>
                  <p>Registered models</p>
                </div>
              </div>
            </div>

            <div className={styles.featuresSection}>
              <h2>Why use the FIPE Table?</h2>
              <div className={styles.featuresList}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <div>
                    <h4>National Reference</h4>
                    <p>Accepted by banks, insurance companies, and dealerships throughout the country</p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <div>
                    <h4>Reliable Data</h4>
                    <p>Rigorous methodology based on market research</p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <div>
                    <h4>Constant Updates</h4>
                    <p>Values updated monthly to reflect the current market</p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <div>
                    <h4>Free Access</h4>
                    <p>Unlimited queries at no cost</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;