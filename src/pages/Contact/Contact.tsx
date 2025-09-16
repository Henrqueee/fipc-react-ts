import React from 'react';
import { TextInput, SelectInput } from '../../components/UI/Inputs/Inputs';
import { SubmitButton } from '../../components/UI/Buttons/Buttons';
import { Title, Text, Heading, Subtitle } from '../../components/UI/Typography';
import { ToastContainer } from '../../components/UI/Toast';
import { useContactForm } from '../../hooks/useContactForm';
import { useContactActions } from '../../hooks/useContactActions';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const {
    values: formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    reset
  } = useContactForm();

  const {
    isSubmitting,
    submitContact,
    toasts,
    hideToast
  } = useContactActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitContact(formData);
    if (success) {
      reset();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <div className={styles.contact}>
      <main className={styles.main}>
        <div className="container">
          <section className={styles.hero}>
            <Title variant="hero" className={styles.title}>Get in Touch</Title>
            <Subtitle variant="hero">
              Have questions or suggestions? We're here to help!
            </Subtitle>
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
                <ToastContainer toasts={toasts} onClose={hideToast} />
                
                <Heading variant="large" level={2}>Send Your Message</Heading>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <TextInput
                      id="name"
                      label="Full Name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your full name"
                      required
                    />
                    {errors.name && touched.name && (
                      <Text className={styles.errorText}>{errors.name}</Text>
                    )}

                    <TextInput
                      id="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.email && touched.email && (
                      <Text className={styles.errorText}>{errors.email}</Text>
                    )}
                  </div>

                  <SelectInput
                    id="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('subject')}
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
                  {errors.subject && touched.subject && (
                    <Text className={styles.errorText}>{errors.subject}</Text>
                  )}

                  <div className={styles.formGroup}>
                    <Text as="span">Message *</Text>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('message')}
                      className={styles.textarea}
                      placeholder="Describe your question or suggestion..."
                      rows={6}
                    />
                    {errors.message && touched.message && (
                      <Text className={styles.errorText}>{errors.message}</Text>
                    )}
                  </div>

                  <SubmitButton
                    loading={isSubmitting}
                    disabled={!isValid}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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