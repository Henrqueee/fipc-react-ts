import React from 'react';
import { Heading, Text } from '../../components/UI/Typography';
import { TextInput } from '../../components/UI/Inputs/Inputs';
import { SubmitButton } from '../../components/UI/Buttons/Buttons';
import Avatar from '../../components/UI/Avatar/Avatar';
import { ToastContainer } from '../../components/UI/Toast';
import Card from '../../components/Card/Card';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/authService';
import { useForm } from '../../hooks/useForm';
import useToast from '../../hooks/useToast';
import { VALIDATION_RULE_SETS } from '../../services/validationService';
import styles from './Profile.module.css';

interface ProfileFormData extends Record<string, string> {
  name: string;
  email: string;
  phone: string;
  location: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { toasts, showToast, hideToast } = useToast();
  
  const form = useForm<ProfileFormData>({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: '',
      currentPassword: '',
      password: '',
      confirmPassword: ''
    },
    validationRules: {
      name: VALIDATION_RULE_SETS.NAME,
      email: VALIDATION_RULE_SETS.EMAIL,
      phone: VALIDATION_RULE_SETS.PHONE,
      location: {
        required: false,
        minLength: 2,
        maxLength: 100
      },
      currentPassword: {
        required: false,
        custom: (value: string) => {
          if ((form.values.password || form.values.confirmPassword) && !value) {
            return 'Current password is required to change password';
          }
          return null;
        }
      },
      password: {
        required: false,
        minLength: 6,
        custom: (value: string) => {
          if (value && form.values.confirmPassword && value !== form.values.confirmPassword) {
            return 'Passwords do not match';
          }
          return null;
        }
      },
      confirmPassword: {
        required: false,
        custom: (value: string) => {
          if (form.values.password && value !== form.values.password) {
            return 'Passwords do not match';
          }
          return null;
        }
      }
    },
    onSubmit: async (values) => {
      // Update user data in localStorage and auth store
      const updatedUserData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        location: values.location
      };
      
      // Save to localStorage via authService
      await authService.updateUser(updatedUserData);
      
      // Update auth store
      updateUser(updatedUserData);
      
      // Handle password change if provided
      if (values.password && values.password.trim() !== '') {
        await authService.changePassword(values.currentPassword, values.password);
        showToast('Profile and password updated successfully!', 'success');
        form.setFieldValue('currentPassword', '');
        form.setFieldValue('password', '');
        form.setFieldValue('confirmPassword', '');
      } else {
        showToast('Profile updated successfully!', 'success');
      }
    },
    enableToast: false
  });

  // All form handling is now managed by the useForm hook

  const handleImageUpload = async (file: File) => {
    console.log('File upload attempt:', {
      name: file.name,
      size: file.size,
      type: file.type,
      sizeInMB: (file.size / (1024 * 1024)).toFixed(2)
    });

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file.', 'error');
      return;
    }

    // Increased size limit to 10MB to accommodate different browser behaviors
    if (file.size > 10 * 1024 * 1024) {
      showToast('Image size must be less than 10MB.', 'error');
      return;
    }

    const reader = new FileReader();
    
    reader.onerror = () => {
      showToast('Failed to read image file.', 'error');
    };
    
    reader.onload = async (e) => {
      try {
        const result = e.target?.result;
        if (!result || typeof result !== 'string') {
          throw new Error('Invalid image data');
        }
        
        const base64Image = result;
        
        // Save to localStorage via authService
        await authService.updateUser({ avatar: base64Image });
        
        // Update auth store
        updateUser({ avatar: base64Image });
        
        showToast('Profile picture updated!', 'success');
      } catch (error) {
        console.error('Error updating profile picture:', error);
        showToast('Failed to update profile picture.', 'error');
      }
    };
    
    reader.readAsDataURL(file);
  };

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
                <SubmitButton loading={form.isSubmitting} disabled={!form.isValid}>
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