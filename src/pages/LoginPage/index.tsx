// src/pages/LoginPage/LoginPage.tsx

import { useAppDispatch, useAppSelector } from '../../hooks';

import AuthForm from '../../components/AuthForm/AuthForm';
import React from 'react';
import { loginUser } from '../../store/slices/authSlice';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: { auth: any }) => state.auth);

  const handleLogin = (data: { email: string; password: string }) => {
    dispatch(loginUser(data));
  };

  return (
    <div className={styles.page}>
      <AuthForm onSubmit={handleLogin} loading={loading} />
    </div>
  );
};

export default LoginPage;
