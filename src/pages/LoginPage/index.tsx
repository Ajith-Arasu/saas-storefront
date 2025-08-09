import * as yup from 'yup';

import { Button, Link, Paper, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginFormInputs {
  email: string;
  password: string;
}

// Define Yup validation schema
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

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Login with:', data);
    if(data.email=='admin@gmail.com' && data.password=="Admin@123"){
      navigate('/dashboard')
    }
    // TODO: Dispatch login action here
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
    </div>
  );
}
