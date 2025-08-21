import React, { useState } from 'react';
import { TextInput, SelectInput } from '../../components/UI/Inputs/Inputs';
import { SubmitButton } from '../../components/UI/Buttons/Buttons';
import { Title, Text, Heading } from '../../components/UI/Typography';
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
            <Title variant="hero" className={styles.title}>Get in Touch</Title>
            <Text className={styles.subtitle}>
              Have questions or suggestions? We're here to help!
            </Text>
          </section>

          <div className={styles.content}>
            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <Heading variant="large" level={2}>Contact Information</Heading>
                
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📧</div>
                  <div className={styles.contactDetails}>
                    <Heading variant="medium" level={3}>Email</Heading>
                    <Text>contact@fipequery.com</Text>
                    <Text>We respond within 24 hours</Text>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>📞</div>
                  <div className={styles.contactDetails}>
                    <Heading variant="medium" level={3}>Phone</Heading>
                    <Text>(11) 3000-0000</Text>
                    <Text>Monday to Friday, 9am to 6pm</Text>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>💬</div>
                  <div className={styles.contactDetails}>
                    <Heading variant="medium" level={3}>Live Chat</Heading>
                    <Text>Real-time support</Text>
                    <Text>Monday to Friday, 9am to 6pm</Text>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>❓</div>
                  <div className={styles.contactDetails}>
                    <Heading variant="medium" level={3}>FAQ</Heading>
                    <Text>Frequently asked questions</Text>
                    <Text>Quick answers to common questions</Text>
                  </div>
                </div>
              </div>


            </div>

            <div className={styles.formSection}>
              <div className={styles.formCard}>
                <Heading variant="large" level={2}>Send Your Message</Heading>
                
                {success && (
                  <div className={styles.successMessage}>
                    ✅ Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <TextInput
                      id="name"
                      label="Full Name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />

                    <TextInput
                      id="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <SelectInput
                    id="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Select subject"
                    required
                    options={[
                      { value: "query-question", label: "Query question" },
                      { value: "technical-issue", label: "Technical issue" },
                      { value: "suggestion", label: "Suggestion" },
                      { value: "partnership", label: "Partnership" },
                      { value: "other", label: "Other" }
                    ]}
                  />

                  <div className={styles.formGroup}>
                    <Text as="label" htmlFor="message">Message *</Text>
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

                  <SubmitButton
                    type="submit"
                    loading={loading}
                    onClick={() => {}}
                  >
                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                  </SubmitButton>
                </form>
              </div>
            </div>
          </div>

          <section className={styles.faqSection}>
            <Heading variant="large" level={2}>Frequently Asked Questions</Heading>
            <div className={styles.faqContainer}>
              <div className={styles.faqItem}>
                <Heading variant="medium" level={3}>How does the FIPE query work?</Heading>
                <Text>
                  The query is free and simple. Select the vehicle type, brand, 
                  model and year to get the updated FIPE table value.
                </Text>
              </div>
              
              <div className={styles.faqItem}>
                <Heading variant="medium" level={3}>Are the values updated?</Heading>
                <Text>
                  Yes! Values are updated monthly according to the official 
                  FIPE table, always in the first half of the month.
                </Text>
              </div>
              
              <div className={styles.faqItem}>
                <Heading variant="medium" level={3}>Can I save my queries?</Heading>
                <Text>
                  Yes, all your queries are saved in the history for 
                  later consultation and value comparison.
                </Text>
              </div>
              
              <div className={styles.faqItem}>
                <Heading variant="medium" level={3}>Is the service free?</Heading>
                <Text>
                  Completely free! You can make as many queries as you want 
                  without any cost or limitation.
                </Text>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;