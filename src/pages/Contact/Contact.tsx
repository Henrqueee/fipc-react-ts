import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate form submission
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className={styles.contact}>
      <main className={styles.main}>
        <div className="container">
          <section className={styles.hero}>
            <h1 className={styles.title}>Get in Touch</h1>
            <p className={styles.subtitle}>
              Have questions or suggestions? We're here to help!
            </p>
          </section>

          <div className={styles.content}>
            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <h2>Contact Information</h2>
                
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📧</div>
                  <div className={styles.contactDetails}>
                    <h3>Email</h3>
                    <p>contact@fipequery.com</p>
                    <span>We respond within 24 hours</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📞</div>
                  <div className={styles.contactDetails}>
                    <h3>Phone</h3>
                    <p>(11) 3000-0000</p>
                    <span>Monday to Friday, 9am to 6pm</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>💬</div>
                  <div className={styles.contactDetails}>
                    <h3>Live Chat</h3>
                    <p>Real-time support</p>
                    <span>Monday to Friday, 9am to 6pm</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>❓</div>
                  <div className={styles.contactDetails}>
                    <h3>FAQ</h3>
                    <p>Frequently asked questions</p>
                    <span>Quick answers to common questions</span>
                  </div>
                </div>
              </div>

              <div className={styles.socialCard}>
                <h3>Social Media</h3>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialLink}>
                    <span>📘</span>
                    Facebook
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <span>📷</span>
                    Instagram
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <span>🐦</span>
                    Twitter
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <span>💼</span>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.formCard}>
                <h2>Send Your Message</h2>
                
                {success && (
                  <div className={styles.successMessage}>
                    ✅ Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={styles.select}
                    >
                      <option value="">Select subject</option>
                      <option value="query-question">Query question</option>
                      <option value="technical-issue">Technical issue</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={styles.textarea}
                      placeholder="Describe your question or suggestion..."
                      rows={6}
                    />
                  </div>

                  {error && (
                    <div className={styles.errorMessage}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            <div className={styles.faqContainer}>
              <div className={styles.faqItem}>
                <h3>How does the FIPE query work?</h3>
                <p>
                  The query is free and simple. Select the vehicle type, brand, 
                  model and year to get the updated FIPE table value.
                </p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>Are the values updated?</h3>
                <p>
                  Yes! Values are updated monthly according to the official 
                  FIPE table, always in the first half of the month.
                </p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>Can I save my queries?</h3>
                <p>
                  Yes, all your queries are saved in the history for 
                  later consultation and value comparison.
                </p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>Is the service free?</h3>
                <p>
                  Completely free! You can make as many queries as you want 
                  without any cost or limitation.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;