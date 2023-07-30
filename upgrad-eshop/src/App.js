import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ShoppingCart } from '@material-ui/icons';
import Drawer from '@material-ui/core/Drawer'; // Import Drawer component
import LoginPage from './components/login';
import SignupPage from './components/signup';
import ProductsPage from './components/products';
import AddProductsPage from './components/addProducts';
import axios from 'axios';

function NavBar() {
  // Simulated user login status and isAdmin status
  const isLoggedIn = true;
  const isAdmin = true;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to handle Drawer open/close

  // Function to handle user logout
  const handleLogout = () => {
    // Perform the necessary logout actions here
    console.log('User logged out.');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <ShoppingCart />
        <nav style={{ marginLeft: 'auto' }}>
          {!isLoggedIn && (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
                Log In
              </Link>
              <Link to="/signup" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
                Sign Up
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <input type="text" placeholder="Search" style={{ marginLeft: '10px' }} />
              <Link to="/" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
                Home
              </Link>
              {isAdmin && (
                <Link to="/add-products" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>
                  Add Products
                </Link>
              )}
              <button
                onClick={handleLogout}
                style={{
                  marginLeft: '10px',
                  color: 'white',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          )}
          {/* Add a hamburger icon for mobile view */}
          <div style={{ marginLeft: '10px' }} onClick={() => setIsDrawerOpen(true)}>
            ☰
          </div>
        </nav>
      </Toolbar>
      {/* Create a responsive Drawer for mobile view */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div>
          <Link to="/login" style={{ textDecoration: 'none', display: 'block', padding: '10px' }}>
            Log In
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none', display: 'block', padding: '10px' }}>
            Sign Up
          </Link>
        </div>
      </Drawer>
    </AppBar>
  );
}

function App() {
  // State to store products data fetched from the backend
  const [products, setProducts] = useState([]);

  // Function to fetch data from the backend API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/products');
      setProducts(response.data); // Set the fetched products data to the state
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* Set up routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/products" element={<ProductsPage products={products} />} /> {/* Pass products data as a prop */}
          <Route path="/add-products" element={<AddProductsPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
