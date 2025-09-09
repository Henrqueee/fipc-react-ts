import React, { useState } from 'react';
import { Heading, Text } from '../../components/UI/Typography';
import { TextInput } from '../../components/UI/Inputs/Inputs';
import { SubmitButton } from '../../components/UI/Buttons/Buttons';
import Avatar from '../../components/UI/Avatar/Avatar';
import Toast from '../../components/UI/Toast/Toast';
import Card from '../../components/Card/Card';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/authService';
import styles from './Profile.module.css';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  // Removed unused isEditing state
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    currentPassword: '',
    password: '',
    confirmPassword: '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: value
      };
      
      // Update full name when firstName or lastName changes
      if (name === 'firstName' || name === 'lastName') {
        const firstName = name === 'firstName' ? value : prev.firstName;
        const lastName = name === 'lastName' ? value : prev.lastName;
        updated.name = `${firstName} ${lastName}`.trim();
      }
      
      return updated;
    });
  };

  const validateForm = (): boolean => {
    if (formData.password || formData.confirmPassword) {
      if (!formData.currentPassword) {
        setToastMessage('Current password is required to change password');
        setToastType('error');
        setShowToast(true);
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setToastMessage('Passwords do not match');
        setToastType('error');
        setShowToast(true);
        return false;
      }

      if (formData.password.length < 6) {
        setToastMessage('Password must be at least 6 characters');
        setToastType('error');
        setShowToast(true);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToastMessage('Please enter a valid email');
      setToastType('error');
      setShowToast(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user data in localStorage and auth store
      const updatedUserData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location
      };
      
      // Save to localStorage via authService
      await authService.updateUser(updatedUserData);
      
      // Update auth store
      updateUser(updatedUserData);
      
      // Handle password change if provided
      if (formData.password && formData.password.trim() !== '') {
        await authService.changePassword(formData.currentPassword, formData.password);
        setToastMessage('Profile and password updated successfully!');
      } else {
        setToastMessage('Profile updated successfully!');
      }
      
      setToastType('success');
      setShowToast(true);
      setFormData(prev => ({ ...prev, currentPassword: '', password: '', confirmPassword: '' }));
    } catch (error) {
      setToastMessage('Failed to update profile. Please try again.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    console.log('File upload attempt:', {
      name: file.name,
      size: file.size,
      type: file.type,
      sizeInMB: (file.size / (1024 * 1024)).toFixed(2)
    });

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setToastMessage('Please select a valid image file.');
      setToastType('error');
      setShowToast(true);
      return;
    }

    // Increased size limit to 10MB to accommodate different browser behaviors
    if (file.size > 10 * 1024 * 1024) {
      setToastMessage('Image size must be less than 10MB.');
      setToastType('error');
      setShowToast(true);
      return;
    }

    const reader = new FileReader();
    
    reader.onerror = () => {
      setToastMessage('Failed to read image file.');
      setToastType('error');
      setShowToast(true);
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
        
        setToastMessage('Profile picture updated!');
        setToastType('success');
        setShowToast(true);
      } catch (error) {
        console.error('Error updating profile picture:', error);
        setToastMessage('Failed to update profile picture.');
        setToastType('error');
        setShowToast(true);
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
        {showToast && (
          <Toast isVisible={showToast}
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
        
        <div className={styles.container}>
          {/* Lado esquerdo - Apresentação do Perfil */}
          <div className={styles.presentationSide}>
            <div className={styles.presentationHeader}>
              <div className={styles.avatarSection}>
                <Avatar
                  name={formData.name}
                  avatar={user?.avatar}
                  size="xlarge"
                  showUpload={true}
                  onUpload={handleImageUpload}
                />
              </div>
              
              <div className={styles.userInfo}>
                <Heading level={2} className={styles.userName}>
                  {formData.name}
                </Heading>
                <Text className={styles.userRole}>Member</Text>
                <Text className={styles.userLocation}>{formData.location}</Text>
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
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <TextInput
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                  required
                />
                <TextInput
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Your last name"
                  required
                />
              </div>
              
              <TextInput
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
              
              <TextInput
                id="phone"
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
              />
              
              <TextInput
                id="location"
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Your city, country"
                required
              />
              
              <TextInput
                id="currentPassword"
                name="currentPassword"
                label="Current Password"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter your current password"
              />
              
              <div className={styles.formRow}>
                <TextInput
                  id="password"
                  name="password"
                  label="New Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Leave blank to keep current"
                />
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your new password"
                />
              </div>
              
              <div className={styles.formActions}>
                <SubmitButton loading={isLoading}>
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