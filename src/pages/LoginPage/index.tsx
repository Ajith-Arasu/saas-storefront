import * as yup from 'yup';

import {
  Alert,
  Button,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { setCookie } from '../../utils/cookies';
import { signInUser } from '../../api/signup';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  passwordhash: string;
}

// Validation schema
const schema = yup
  .object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  .required();

export default function Login() {
  const navigate = useNavigate();

  // Snackbar state for error messages
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const signInData: SignInData = {
        email: data.email,
        passwordhash: data.password,
      };

      const result = await signInUser(signInData);
      if (result.message === 'Sign in successful') {
        setCookie('login', 'true', 1);
        navigate('/dashboard');
      } else {
        // Show API response error message if any
        setSnackbarMsg(result.message || 'Login failed');
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      // Show error message in Snackbar
      setSnackbarMsg(error.message || 'Invalid user credentials');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className={styles.container}>
      <Paper elevation={3} className={styles.card}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.button}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" className={styles.registerText}>
          Don’t have an account?{' '}
          <Link
            component="button"
            onClick={() => navigate('/register')}
            underline="hover"
          >
            Register
          </Link>
        </Typography>
      </Paper>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
