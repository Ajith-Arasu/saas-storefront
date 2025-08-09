import { Navigate } from 'react-router-dom';
import React from 'react';
import { getCookie } from '../utils/cookies';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const loginCookie = getCookie('login');

  if (!loginCookie) {
    // No login cookie, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Cookie exists, render children
  return children;
};

export default ProtectedRoute;
