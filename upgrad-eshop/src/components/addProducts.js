import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@material-ui/core';

function addProducts() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddProduct = async () => {
    try {
      // Reset success and error messages
      setSuccessMessage('');
      setErrorMessage('');

      // Validate form fields
      if (!name.trim()) {
        setErrorMessage('Product Name is required');
        return;
      }

      if (!category.trim()) {
        setErrorMessage('Category is required');
        return;
      }

      if (!price.trim()) {
        setErrorMessage('Price is required');
        return;
      }

      // Replace 'http://localhost:3001' with your actual backend API base URL
      const response = await axios.post('http://localhost:3001/api/v1/products', {
        name,
        category,
        price,
        description,
      });

      // Assuming the backend returns a success response
      if (response.data.success) {
        // Show success message
        setSuccessMessage('Product added successfully');

        // Clear the form fields
        setName('');
        setCategory('');
        setPrice('');
        setDescription('');
      }
    } catch (error) {
      console.error('Add product failed', error);
      // Show error message
      setErrorMessage('Failed to add product. Please try again later.');
    }
  };

  return (
    <div>
      <Typography variant="h3">Add Products</Typography>
      <form>
        <TextField
          type="text"
          label="Product Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errorMessage && !name.trim()}
          helperText={errorMessage && !name.trim() ? errorMessage : ''}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          label="Category"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          error={!!errorMessage && !category.trim()}
          helperText={errorMessage && !category.trim() ? errorMessage : ''}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={!!errorMessage && !price.trim()}
          helperText={errorMessage && !price.trim() ? errorMessage : ''}
          fullWidth
          margin="normal"
        />
        <TextField
          type="text"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </form>

      {/* Show success message */}
      {successMessage && <Typography variant="body1" style={{ color: 'green' }}>{successMessage}</Typography>}
    </div>
  );
}

export default addProducts;
