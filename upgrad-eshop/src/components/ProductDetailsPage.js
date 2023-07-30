import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button } from '@material-ui/core';

function ProductDetailsPage() {
  const { id } = useParams(); // Get the product ID from the URL parameter
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  // Function to fetch the product details
  const fetchProductDetails = async () => {
    try {
      // Replace 'http://localhost:3001' with your actual backend API base URL
      const response = await axios.get(`http://localhost:3001/api/v1/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError('Error fetching product details');
    }
  };

  useEffect(() => {
    // Fetch the product details when the component mounts
    fetchProductDetails();
  }, [id]);

  const handleBuy = () => {
    // Implement the logic to handle the buy button click here
    // You can use the 'quantity' state to get the selected quantity of the product
    // You may want to perform any necessary actions like adding the product to the cart, etc.
    console.log(`Buying ${quantity} units of ${product.name}`);
    // Add your logic to handle the purchase here...
  };

  if (error) {
    return <Typography variant="h3">{error}</Typography>;
  }

  if (!product) {
    // Display a loading message or spinner while fetching the product details
    return <Typography variant="h3">Loading...</Typography>;
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h3">{product.name}</Typography>
          <Typography variant="body1">Category: {product.category}</Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>
          {/* Add an image element to display the product image */}
          <img
            src={product.image} // Use the URL of the product image from the product object
            alt={product.name} // Set the alternate text to the product name for accessibility
            style={{ maxWidth: '100%', height: 'auto' }} // Use this style to bound the image properly
          />
          <TextField
            type="number"
            label="Quantity"
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            inputProps={{ min: 1 }} // Set the minimum value to 1 to prevent negative or zero quantity
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleBuy}>
            Buy
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDetailsPage;
