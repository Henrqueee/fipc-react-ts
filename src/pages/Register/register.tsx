import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../../components/UI/Inputs/Inputs';
import { SubmitButton } from '../../components/UI/Buttons/Buttons';
import { Title, Text, Heading } from '../../components/UI/Typography';
import { ToastContainer } from '../../components/UI/Toast';
import Card from '../../components/Card/Card';
import { authService } from '../../services/authService';
import { useForm } from '../../hooks/useForm';
import useToast from '../../hooks/useToast';
import { VALIDATION_RULE_SETS } from '../../services/validationService';
import styles from './Register.module.css';

interface IRegisterFormData extends Record<string, string> {
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

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, showToast, hideToast } = useToast();
  
  const form = useForm<IRegisterFormData>({
    initialValues: {
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
    },
    validationRules: {
      firstName: VALIDATION_RULE_SETS.NAME,
      lastName: VALIDATION_RULE_SETS.NAME,
      email: VALIDATION_RULE_SETS.EMAIL,
      phone: VALIDATION_RULE_SETS.PHONE,
      birthDate: {
        required: true,
        custom: (value: string) => {
          if (!value) return 'Birth date is required';
          const date = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          if (age < 18) return 'You must be at least 18 years old';
          if (age > 120) return 'Please enter a valid birth date';
          return null;
        }
      },
      gender: VALIDATION_RULE_SETS.OPTIONAL_TEXT,
      city: VALIDATION_RULE_SETS.CITY,
      state: VALIDATION_RULE_SETS.STATE,
      password: VALIDATION_RULE_SETS.PASSWORD,
      confirmPassword: {
        required: true,
        custom: (value: string) => {
          if (value !== form.values.password) {
            return 'Passwords do not match';
          }
          return null;
        }
      }
    },
    onSubmit: async (values) => {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        birthDate: values.birthDate,
        gender: values.gender,
        city: values.city,
        state: values.state,
        password: values.password
      };
      
      await authService.register(userData);
      showToast('Registration completed successfully!', 'success');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
    enableToast: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    form.handleChange(id as keyof IRegisterFormData, value);
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
            
            <form className={styles.form} onSubmit={form.handleSubmit}>
              <div className={styles.formRow}>
                <TextInput
                    id="firstName"
                    label="First Name"
                    value={form.values.firstName}
                    onChange={handleInputChange}
                    placeholder="Your first name"
                    required
                  />
                <TextInput
                    id="lastName"
                    label="Last Name"
                    value={form.values.lastName}
                    onChange={handleInputChange}
                    placeholder="Your last name"
                    required
                  />
              </div>
              
              <TextInput
                  id="email"
                  label="Email"
                  type="email"
                  value={form.values.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              
              <TextInput
                  id="phone"
                  label="Phone"
                  value={form.values.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                />
              
              <div className={styles.formRow}>
                <TextInput
                    id="birthDate"
                    label="Birth Date"
                    type="date"
                    value={form.values.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                <TextInput
                    id="gender"
                    label="Gender"
                    value={form.values.gender}
                    onChange={handleInputChange}
                    placeholder="Male/Female/Other"
                  />
              </div>
              
              <div className={styles.formRow}>
                <TextInput
                    id="city"
                    label="City"
                    value={form.values.city}
                    onChange={handleInputChange}
                    placeholder="Your city"
                    required
                  />
                <TextInput
                    id="state"
                    label="State"
                    value={form.values.state}
                    onChange={handleInputChange}
                    placeholder="Your state"
                    required
                  />
              </div>
              
              <div className={styles.formRow}>
                <TextInput
                    id="password"
                    label="Password"
                    type="password"
                    value={form.values.password}
                    onChange={handleInputChange}
                    placeholder="Your password"
                    required
                  />
                <TextInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={form.values.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
              </div>
              
              <div className={styles.formActions}>
                <SubmitButton loading={form.isSubmitting}>
                  Create Account
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
        
        <ToastContainer toasts={toasts} onClose={hideToast} />
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