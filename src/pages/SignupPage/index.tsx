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

import { signupUser } from '../../api/signup';
import styles from './SignupPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterFormInputs {
  name: string;
  email: string;
  passwordhash: string;
}

// Yup validation schema
const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    passwordhash: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  .required();

export default function Register() {
  const navigate = useNavigate();

  // Snackbar state for success message
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      passwordhash: '',
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      console.log('Register with:', data);
      const response = await signupUser(data);

      if (response.message === 'User added') {
        setSnackbarOpen(true);
        // After 1 second, navigate to login page
        setTimeout(() => {
          setSnackbarOpen(false);
          navigate('/login');
        }, 1000);
      }

      console.log('Signup success:', response);
      // You can add other success handling here if needed
    } catch (error: any) {
      if (error.response) {
        console.error('Signup error:', error.response.data);
        // Show error to user or handle accordingly
      } else {
        console.error('Signup failed:', error.message);
      }
    }
  };

  const handleSnackbarClose = (_, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className={styles.container}>
      <Paper elevation={3} className={styles.card}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
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
            name="passwordhash"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...field}
                error={!!errors.passwordhash}
                helperText={errors.passwordhash?.message}
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
            Register
          </Button>
        </form>
        <Typography variant="body2" className={styles.loginText}>
          Already have an account?{' '}
          <Link
            component="button"
            onClick={() => navigate('/login')}
            underline="hover"
          >
            Login
          </Link>
        </Typography>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          User created successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
