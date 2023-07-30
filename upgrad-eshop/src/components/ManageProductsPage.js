import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@material-ui/icons';

function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState('');

  // Function to fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // Fetch all products when the component mounts
    fetchProducts();
  }, []);

  // Function to handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      // Replace 'http://localhost:3001' with your actual backend API base URL
      await axios.delete(`http://localhost:3001/api/v1/products/${productId}`);
      // Update the products list after successful deletion
      setProducts(products.filter((product) => product._id !== productId));
      setMessage(`Product ${selectedProduct.name} deleted successfully.`);
      // Close the delete confirmation dialog
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Function to handle product modification (Edit)
  const handleEditProduct = async (productId, updatedProductData) => {
    try {
      // Replace 'http://localhost:3001' with your actual backend API base URL
      await axios.put(`http://localhost:3001/api/v1/products/${productId}`, updatedProductData);
      // Fetch all products again after successful modification
      fetchProducts();
      setMessage(`Product ${selectedProduct.name} modified successfully.`);
    } catch (error) {
      console.error('Error modifying product:', error);
    }
  };

  const handleDeleteConfirmationOpen = (product) => {
    setSelectedProduct(product);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleProductEdit = (productId, updatedProductData) => {
    handleEditProduct(productId, updatedProductData);
  };

  return (
    <div>
      <Typography variant="h3">Manage Products</Typography>

      {/* Display the message if any */}
      {message && <Typography variant="body1">{message}</Typography>}

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          // Redirect to the Add Product page when the Add Product link is clicked
          window.location.href = '/add-product';
        }}
      >
        Add Product
      </Button>

      {/* Display all products */}
      {products.map((product) => (
        <Card key={product._id} style={{ margin: '10px' }}>
          <CardContent>
            <Typography variant="h5">{product.name}</Typography>
            <Typography variant="body1">Price: ${product.price}</Typography>
            <Typography variant="body2">Category: {product.category}</Typography>

            {/* Modify and Delete icons */}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => {
                // Redirect to the Edit Product page when the Edit icon is clicked
                window.location.href = `/edit-product/${product._id}`;
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteConfirmationOpen(product)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Delete confirmation dialog */}
      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteProduct(selectedProduct._id)}
            color="secondary"
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageProductsPage;
