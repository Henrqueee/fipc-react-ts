import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import Home from '../pages/Home/Home';
import { About } from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Favorites from '../pages/Favorites/Favorites';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import Loading from '../components/Loading/Loading';

const Routes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  const ProtectedElement: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (isLoading) {
      return <Loading />;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    } 
    
    return <>{children}</>;
  };

  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/favorites" 
        element={
          <ProtectedElement>
            <Favorites />
          </ProtectedElement>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedElement>
            <Profile />
          </ProtectedElement>
        } 
      />
    </RouterRoutes>
  );
};

export default Routes;