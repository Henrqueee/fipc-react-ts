import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { TextInput } from '../../components/UI/Inputs/Inputs';
import { SubmitButton } from '../../components/UI/Buttons/Buttons';
import { Title, Text, Heading } from '../../components/UI/Typography';
import Card from '../../components/Card/Card';
import styles from './Register.module.css';

interface IRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  city: string;
  state: string;
  password: string;
  confirmPassword: string;
}

interface IToast {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<IToast>({
    message: '',
    type: 'success',
    visible: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({
      message,
      type,
      visible: true
    });

    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.birthDate || !formData.city || !formData.state || !formData.password || !formData.confirmPassword) {
      showToast('Please fill in all required fields', 'error');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email', 'error');
      return false;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: formData.gender,
        city: formData.city,
        state: formData.state,
        password: formData.password
      };
      
      await authService.register(userData);
      
      showToast('Registration completed successfully!', 'success');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className={styles.registerPage}>
        <div className={styles.container}>
          {/* Lado esquerdo - Apresentação */}
          <div className={styles.presentationSide}>
            <div className={styles.presentationHeader}>
              <Title className={styles.presentationTitle}>Welcome to FIPE Query</Title>
              <Text className={styles.presentationSubtitle}>
                Create your account and get access to all features of our platform
              </Text>
            </div>
            
            <div className={styles.cardsContainer}>
              <Card
                icon="🔍"
                title="Simplified Search"
                description="Access vehicle price information quickly and accurately"
                animated={true}
                animationDelay={0.1}
              />
              <Card
                icon="⭐"
                title="Favorites"
                description="Save your favorite searches for quick access in the future"
                animated={true}
                animationDelay={0.3}
              />
              <Card
                icon="📊"
                title="Complete History"
                description="Track all your previous searches in one place"
                animated={true}
                animationDelay={0.5}
              />
            </div>
          </div>
          
          {/* Lado direito - Formulário */}
          <div className={styles.formSide}>
            <div className={styles.formHeader}>
              <Heading level={2} className={styles.formTitle}>Create Account</Heading>
              <Text className={styles.formSubtitle}>
                Fill in the fields below to register
              </Text>
            </div>
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <TextInput
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                  required
                />
                <TextInput
                  id="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                  required
                />
              </div>
              
              <TextInput
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
              
              <TextInput
                id="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
              />
              
              <div className={styles.formRow}>
                <TextInput
                  id="birthDate"
                  label="Birth Date"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  id="gender"
                  label="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="Male/Female/Other"
                />
              </div>
              
              <div className={styles.formRow}>
                <TextInput
                  id="city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  required
                />
                <TextInput
                  id="state"
                  label="State"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Your state"
                  required
                />
              </div>
              
              <div className={styles.formRow}>
                <TextInput
                  id="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  required
                />
                <TextInput
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              <div className={styles.formActions}>
                <SubmitButton loading={isLoading}>
                  Create Account
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
        
        {/* Toast de notificação */}
        {toast.visible && (
          <div className={`${styles.toast} ${toast.type === 'success' ? styles.successToast : styles.errorToast}`}>
            {toast.message}
          </div>
        )}
      </div>
      
      {/* Seção 1: Recursos */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresHeader}>
            <Heading level={2} className={styles.featuresTitle}>Exclusive Features</Heading>
            <Text className={styles.featuresSubtitle}>
              Discover all the advantages you'll have when registering on our platform
            </Text>
          </div>
          
          <div className={styles.featuresGrid}>
            <Card
              icon="📱"
              title="Mobile Access"
              description="Check vehicle information anywhere, anytime"
            />
            <Card
              icon="🔔"
              title="Price Alerts"
              description="Receive notifications when the price of a favorite vehicle changes"
            />
            <Card
              icon="📊"
              title="Market Analysis"
              description="View charts and price trends over time"
            />
          </div>
        </div>
      </section>
      
      {/* Seção 2: Depoimentos */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <div className={styles.testimonialsHeader}>
            <Heading level={2} className={styles.testimonialsTitle}>What our users say</Heading>
            <Text className={styles.testimonialsSubtitle}>
              See how our platform has helped people make better decisions
            </Text>
          </div>
          
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Text className={styles.testimonialText}>
                  "The FIPE Query platform helped me save time and money when buying my new car. I recommend it to everyone!"
                </Text>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>MR</div>
                <div>
                  <Text className={styles.testimonialName}>Marcus Rivera</Text>
                  <Text className={styles.testimonialRole}>Customer since 2022</Text>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Text className={styles.testimonialText}>
                  "As a vehicle dealer, this tool has become essential for my business. Accurate and up-to-date data."
                </Text>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>CS</div>
                <div>
                  <Text className={styles.testimonialName}>Caroline Smith</Text>
                  <Text className={styles.testimonialRole}>Dealer</Text>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Text className={styles.testimonialText}>
                  "Intuitive interface and reliable data. I was able to negotiate a better price for my used car thanks to the information."
                </Text>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>JP</div>
                <div>
                  <Text className={styles.testimonialName}>John Parker</Text>
                  <Text className={styles.testimonialRole}>Premium User</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção 3: FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <Heading level={2} className={styles.faqTitle}>Frequently Asked Questions</Heading>
            <Text className={styles.faqSubtitle}>
              Find answers to the most common questions about our platform
            </Text>
          </div>
          
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <Heading level={3} className={styles.faqItemTitle}>How are prices calculated?</Heading>
              <Text className={styles.faqItemText}>
                Our prices are based on the <span>official FIPE table</span>, updated regularly to ensure information accuracy.
              </Text>
            </div>
            
            <div className={styles.faqItem}>
              <Heading level={3} className={styles.faqItemTitle}>Can I access price history?</Heading>
              <Text className={styles.faqItemText}>
                Yes, <span>registered users</span> can access price history for the last 12 months for any vehicle.
              </Text>
            </div>
            
            <div className={styles.faqItem}>
              <Heading level={3} className={styles.faqItemTitle}>How to save favorite vehicles?</Heading>
              <Text className={styles.faqItemText}>
                After performing a search, just click on the <span>star icon</span> to add the vehicle to your favorites.
              </Text>
            </div>
            
            <div className={styles.faqItem}>
              <Heading level={3} className={styles.faqItemTitle}>How often is the data updated?</Heading>
              <Text className={styles.faqItemText}>
                Our database is updated monthly, following the official FIPE table update schedule.
              </Text>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;