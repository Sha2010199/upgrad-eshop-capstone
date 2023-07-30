import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@material-ui/core';

function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignup = async () => {
    try {
      // Reset previous errors
      setErrors({});

      // Validate form fields
      const formErrors = {};
      if (!firstName.trim()) {
        formErrors.firstName = 'First Name is required';
      }

      if (!lastName.trim()) {
        formErrors.lastName = 'Last Name is required';
      }

      if (!email.trim()) {
        formErrors.email = 'Email Address is required';
      }

      if (!password.trim()) {
        formErrors.password = 'Password is required';
      }

      if (!confirmPassword.trim()) {
        formErrors.confirmPassword = 'Confirm Password is required';
      } else if (password !== confirmPassword) {
        formErrors.confirmPassword = 'Passwords do not match';
      }

      if (!contactNumber.trim()) {
        formErrors.contactNumber = 'Contact Number is required';
      }

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      const response = await axios.post('http://localhost:3001/api/v1/users', {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
    });

    // Assuming the backend returns a success response with the user data
    if (response.status === 200) {
      // Perform any necessary actions on successful signup, e.g., set user info in local storage
      console.log('User registered successfully');
      // Redirect to the products page
      window.location.href = '/products';
    } else {
      // Handle any errors returned from the backend
      console.error('Signup failed', response.data);
      // Update the errors state to show error messages
      setErrors({ ...formErrors, backendError: response.data });
    }
  } catch (error) {
    // Handle any other errors that might occur during the API call
    console.error('Signup failed', error);
  }
};

  return (
    <div>
      <Typography variant="h2">Sign Up</Typography>
      <form>
        <TextField
          type="text"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          label="Email Address"
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
        <TextField
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
          margin="normal"
        />
        <TextField
          type="tel"
          label="Contact Number"
          variant="outlined"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          error={!!errors.contactNumber}
          helperText={errors.contactNumber}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignupPage;
