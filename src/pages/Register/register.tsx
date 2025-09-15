import React from 'react';
import { Link } from 'react-router-dom';
import { useRegistrationForm } from '../../hooks/useRegistrationForm';
import type { RegistrationFieldName } from '../../types/registrationTypes';
import styles from './Register.module.css';

const Register: React.FC = () => {
  const {
    values: formData,
    errors: validationErrors,
    isSubmitting,
    handleChange: handleInputChange,
    handleSubmit
  } = useRegistrationForm();

  const handleFieldChange = (field: RegistrationFieldName) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleInputChange(field, e.target.value);
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.registerHeader}>
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.subtitle}>Join us and start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleFieldChange('firstName')}
              className={`${styles.input} ${validationErrors.firstName ? styles.inputError : ''}`}
              placeholder="Enter your first name"
              disabled={isSubmitting}
            />
            {validationErrors.firstName && (
              <span className={styles.errorMessage}>{validationErrors.firstName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleFieldChange('lastName')}
              className={`${styles.input} ${validationErrors.lastName ? styles.inputError : ''}`}
              placeholder="Enter your last name"
              disabled={isSubmitting}
            />
            {validationErrors.lastName && (
              <span className={styles.errorMessage}>{validationErrors.lastName}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleFieldChange('email')}
              className={`${styles.input} ${validationErrors.email ? styles.inputError : ''}`}
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />
            {validationErrors.email && (
              <span className={styles.errorMessage}>{validationErrors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleFieldChange('password')}
              className={`${styles.input} ${validationErrors.password ? styles.inputError : ''}`}
              placeholder="Create a strong password"
              disabled={isSubmitting}
            />
            {validationErrors.password && (
              <span className={styles.errorMessage}>{validationErrors.password}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleFieldChange('confirmPassword')}
              className={`${styles.input} ${validationErrors.confirmPassword ? styles.inputError : ''}`}
              placeholder="Confirm your password"
              disabled={isSubmitting}
            />
            {validationErrors.confirmPassword && (
              <span className={styles.errorMessage}>{validationErrors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className={styles.loginLink}>
          <p>
            Already have an account?{' '}
            <Link to="/login" className={styles.link}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Join Us?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚗</div>
              <h3 className={styles.featureTitle}>Save Your Favorites</h3>
              <p className={styles.featureDescription}>
                Keep track of vehicles you're interested in and never lose sight of your dream car.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔍</div>
              <h3 className={styles.featureTitle}>Advanced Search</h3>
              <p className={styles.featureDescription}>
                Use our powerful search filters to find exactly what you're looking for.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3 className={styles.featureTitle}>Mobile Friendly</h3>
              <p className={styles.featureDescription}>
                Access your account and search for vehicles on any device, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What Our Users Say</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "This platform made finding my perfect car so easy. The search features are incredible!"
              </p>
              <div className={styles.testimonialAuthor}>
                <strong>Sarah Johnson</strong>
                <span>Happy Customer</span>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "I love how I can save my favorite vehicles and compare them later. Very convenient!"
              </p>
              <div className={styles.testimonialAuthor}>
                <strong>Mike Chen</strong>
                <span>Car Enthusiast</span>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                "The mobile experience is fantastic. I can browse cars during my commute!"
              </p>
              <div className={styles.testimonialAuthor}>
                <strong>Emily Rodriguez</strong>
                <span>Busy Professional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Is registration free?</h3>
              <p className={styles.faqAnswer}>
                Yes! Creating an account is completely free and gives you access to all our features.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>How secure is my data?</h3>
              <p className={styles.faqAnswer}>
                We take security seriously and use industry-standard encryption to protect your information.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Can I change my preferences later?</h3>
              <p className={styles.faqAnswer}>
                Absolutely! You can update your profile and preferences anytime from your account settings.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>Do you send promotional emails?</h3>
              <p className={styles.faqAnswer}>
                We only send relevant updates about your saved vehicles and account activity. You can opt out anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;