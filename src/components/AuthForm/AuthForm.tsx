// src/components/AuthForm/AuthForm.tsx

import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import styles from "./AuthForm.module.css";

interface AuthFormProps {
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
  isSignup?: boolean;
  loading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isSignup, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = isSignup
      ? formData
      : { email: formData.email, password: formData.password };
    onSubmit(payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        {isSignup ? "Sign Up" : "Login"}
      </Typography>

      {isSignup && (
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
      )}
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        className={styles.button}
      >
        {loading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
      </Button>
    </Box>
  );
};

export default AuthForm;
