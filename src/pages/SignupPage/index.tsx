// src/pages/SignupPage/SignupPage.tsx

import { useAppDispatch, useAppSelector } from '../../hooks';

import AuthForm from '../../components/AuthForm/AuthForm';
import React from 'react';
import { signupUser } from '../../store/slices/authSlice';
import styles from './SignupPage.module.css';

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: { auth: any }) => state.auth);

  const handleSignup = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch(signupUser(data));
  };

  return (
    <div className={styles.page}>
      <AuthForm onSubmit={handleSignup} isSignup loading={loading} />
    </div>
  );
};

export default SignupPage;
