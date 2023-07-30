import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@material-ui/core';
import * as yup from 'yup';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Yup schema for form validation
  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const handleLogin = async () => {
    try {
      // Reset previous errors
      setErrors({});

      // Validate form fields
      try {
        await loginSchema.validate({ email, password }, { abortEarly: false });
      } catch (validationErrors) {
        const formErrors = {};
        validationErrors.inner.forEach((error) => {
          formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
        return;
      }

      // Make API call to backend for login
      const response = await axios.post('http://localhost:3001/api/v1/auth', {
        email,
        password,
      });

      // Assuming the backend returns a success response
      if (response.data.success) {
        // Perform any necessary actions on successful login, e.g., set user info in local storage
        console.log('User logged in successfully');
        // Redirect to the products page
        window.location.href = '/products';
      }
    } catch (error) {
      console.error('Login failed', error);
      // Handle login failure, show error message, etc.
      setErrors({ loginFailed: 'Invalid email or password. Please try again.' });
    }
  };

  return (
    <div>
      <Typography variant="h2">Login</Typography>
      <form>
        <TextField
          type="text"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          margin="normal"
        />
        {errors.loginFailed && (
          <Typography color="error" variant="body2" gutterBottom>
            {errors.loginFailed}
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
