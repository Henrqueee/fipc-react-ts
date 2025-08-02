import React from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <div className="container">
          <section className={styles.hero}>
            <h1 className={styles.title}>
              FIPE Query
            </h1>
            <p className={styles.subtitle}>
              Check the average price of vehicles in the national market
            </p>
          </section>
          
          <section className={styles.searchSection}>
            <SearchForm />
          </section>
          
          <section className={styles.infoSection}>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>📊</span>
                </div>
                <h3>Updated Data</h3>
                <p>Always updated information from the official FIPE table</p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>💰</span>
                </div>
                <h3>Free Query</h3>
                <p>Perform as many queries as you need at no cost</p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>⚡</span>
                </div>
                <h3>Easy to Use</h3>
                <p>Simple and intuitive interface for your queries</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;