import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { Navigate } from 'react-router-dom'; // Import Redirect from react-router-dom

function ProductsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Replace this with your login state
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortingOption, setSortingOption] = useState('default');

  // Function to fetch product categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/products/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Function to fetch all products with sorting option
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/products', {
        params: {
          sortBy: sortingOption,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // Fetch categories and products when the component mounts
    fetchCategories();
    fetchProducts();
  }, [sortingOption]); // Fetch products whenever the sorting option changes

  const handleSortingChange = (event, newSortingOption) => {
    setSortingOption(newSortingOption);
  };

  if (!isLoggedIn) {
    // Redirect the user to the login page if not logged in
    // Replace this with the actual redirect logic to the login page
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Typography variant="h3">Products Page</Typography>
      <ToggleButtonGroup value={sortingOption} exclusive onChange={handleSortingChange}>
        <ToggleButton value="default">Default</ToggleButton>
        <ToggleButton value="priceHighToLow">Price High to Low</ToggleButton>
        <ToggleButton value="priceLowToHigh">Price Low to High</ToggleButton>
        <ToggleButton value="newest">Newest</ToggleButton>
      </ToggleButtonGroup>

      <div>
        {categories.map((category) => (
          <ToggleButton key={category} value={category}>
            {category}
          </ToggleButton>
        ))}
      </div>

      <div>
        {products.map((product) => (
          <Card key={product._id} style={{ margin: '10px' }}>
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="body1">Price: ${product.price}</Typography>
              <Typography variant="body2">Category: {product.category}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
