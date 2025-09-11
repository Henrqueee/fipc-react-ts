import React from 'react';
import { Heading, Text } from '../../components/UI/Typography';
import { TextInput } from '../../components/UI/Inputs/Inputs';
import { SubmitButton } from '../../components/UI/Buttons/Buttons';
import Avatar from '../../components/UI/Avatar/Avatar';
import { ToastContainer } from '../../components/UI/Toast';
import Card from '../../components/Card/Card';
import { useAuthStore } from '../../store/useAuthStore';
import { useProfileForm } from '../../hooks/useProfileForm';
import { useAvatarUpload } from '../../hooks/useAvatarUpload';
import { useProfileActions } from '../../hooks/useProfileActions';
import useToast from '../../hooks/useToast';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const { toasts, hideToast } = useToast();
  
  const { handleProfileUpdate, isLoading } = useProfileActions();
  const { handleImageUpload } = useAvatarUpload();
  const form = useProfileForm(handleProfileUpdate);



  if (!user) {
    return (
      <div className={styles.container}>
        <Text>Loading user data...</Text>
      </div>
    );
  }

  return (
    <>
      <div className={styles.profilePage}>
        <ToastContainer toasts={toasts} onClose={hideToast} />
        
        <div className={styles.container}>
          {/* Lado esquerdo - Apresentação do Perfil */}
          <div className={styles.presentationSide}>
            <div className={styles.presentationHeader}>
              <div className={styles.avatarSection}>
                <Avatar
                  name={form.values.name}
                  avatar={user?.avatar}
                  size="xlarge"
                  showUpload={true}
                  onUpload={handleImageUpload}
                />
              </div>
              
              <div className={styles.userInfo}>
                <Heading level={2} className={styles.userName}>
                  {form.values.name}
                </Heading>
                <Text className={styles.userRole}>Member</Text>
                <Text className={styles.userLocation}>{form.values.location}</Text>
              </div>
            </div>
            
            <div className={styles.cardsContainer}>
              <Card
                icon="👤"
                title="Profile Management"
                description="Keep your personal information updated and secure"
                animated={true}
                animationDelay={0.1}
              />
              <Card
                icon="🔒"
                title="Security Settings"
                description="Manage your password and privacy preferences"
                animated={true}
                animationDelay={0.3}
              />
              <Card
                icon="⭐"
                title="Premium Features"
                description="Access exclusive features with your premium account"
                animated={true}
                animationDelay={0.5}
              />
            </div>
          </div>
          
          {/* Lado direito - Formulário */}
          <div className={styles.formSide}>
            <div className={styles.formHeader}>
              <Heading level={2} className={styles.formTitle}>Edit Profile</Heading>
              <Text className={styles.formSubtitle}>
                Update your personal information below
              </Text>
            </div>
            
            <form className={styles.form} onSubmit={form.handleSubmit}>
              <TextInput
                id="name"
                name="name"
                label="Full Name"
                value={form.values.name}
                onChange={(e) => form.handleChange('name', e.target.value)}
                placeholder="Your full name"
                required

              />
              
              <TextInput
                id="email"
                name="email"
                label="Email"
                type="email"
                value={form.values.email}
                onChange={(e) => form.handleChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required

              />
              
              <TextInput
                id="phone"
                name="phone"
                label="Phone"
                value={form.values.phone}
                onChange={(e) => form.handleChange('phone', e.target.value)}
                placeholder="(00) 00000-0000"

              />
              
              <TextInput
                id="location"
                name="location"
                label="Location"
                value={form.values.location}
                onChange={(e) => form.handleChange('location', e.target.value)}
                placeholder="Your city, country"

              />
              
              <TextInput
                id="currentPassword"
                name="currentPassword"
                label="Current Password"
                type="password"
                value={form.values.currentPassword}
                onChange={(e) => form.handleChange('currentPassword', e.target.value)}
                placeholder="Enter your current password"

              />
              
              <div className={styles.formRow}>
                <TextInput
                  id="password"
                  name="password"
                  label="New Password"
                  type="password"
                  value={form.values.password}
                  onChange={(e) => form.handleChange('password', e.target.value)}
                  placeholder="Leave blank to keep current"
  
                />
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  value={form.values.confirmPassword}
                  onChange={(e) => form.handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your new password"
  
                />
              </div>
              
              <div className={styles.formActions}>
                <SubmitButton loading={form.isSubmitting || isLoading} disabled={!form.isValid || form.isSubmitting || isLoading}>
                  Save Changes
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Seção 1: Recursos do Perfil */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresHeader}>
            <Heading level={2} className={styles.featuresTitle}>Profile Features</Heading>
            <Text className={styles.featuresSubtitle}>
              Discover all the features available in your profile management
            </Text>
          </div>
          
          <div className={styles.featuresGrid}>
            <Card
              icon="📊"
              title="Activity Dashboard"
              description="Track your searches and favorite vehicles in one place"
            />
            <Card
              icon="🔔"
              title="Smart Notifications"
              description="Get alerts about price changes and new features"
            />
            <Card
              icon="🎯"
              title="Personalized Experience"
              description="Customized recommendations based on your preferences"
            />
          </div>
        </div>
      </section>
      
      {/* Seção 2: Depoimentos */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <div className={styles.testimonialsHeader}>
            <Heading level={2} className={styles.testimonialsTitle}>User Experience</Heading>
            <Text className={styles.testimonialsSubtitle}>
              See how our profile management has helped users
            </Text>
          </div>
          
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Text className={styles.testimonialText}>
                  "The profile management is intuitive and secure. I can easily update my information and track my activity."
                </Text>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>AM</div>
                <div>
                  <Text className={styles.testimonialName}>Ana Martinez</Text>
                  <Text className={styles.testimonialRole}>Premium User</Text>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Text className={styles.testimonialText}>
                  "Love the personalized dashboard and notifications. It keeps me updated on everything I care about."
                </Text>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>RS</div>
                <div>
                  <Text className={styles.testimonialName}>Roberto Silva</Text>
                  <Text className={styles.testimonialRole}>Active User</Text>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <Text className={styles.testimonialText}>
                  "The security features give me peace of mind. My data is safe and the interface is very user-friendly."
                </Text>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>LC</div>
                <div>
                  <Text className={styles.testimonialName}>Lucia Costa</Text>
                  <Text className={styles.testimonialRole}>Long-time Member</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;