import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';

function CreateOrderPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const steps = ['Order Details', 'Shipping Address', 'Confirmation'];

  // Implement the logic to handle order confirmation and API call to place the order
  const handlePlaceOrder = async () => {
    try {
      // Replace 'http://localhost:3001' with your actual backend API base URL
      // Make the API call to create the order using the /orders endpoint
      await axios.post('http://localhost:3001/api/v1/orders', {
        // Add the necessary order details here
        // For example, the product details, quantity, total amount, etc.
      });

      // Make the API call to add the address using the /addresses endpoint
      await axios.post('http://localhost:3001/api/v1/addresses', {
        // Add the necessary shipping address details here
        // For example, address line 1, address line 2, city, state, postal code, etc.
      });

      // Order has been successfully placed, set orderConfirmed to true
      setOrderConfirmed(true);
    } catch (error) {
      // Handle any errors that occur during API calls
      console.error('Error placing the order:', error);
      // You can also display an error message to the user if needed
    }
  };

  // Handle the Next button click to proceed to the next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Handle the Back button click to go back to the previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle the Reset button click to reset the stepper to the first step
  const handleReset = () => {
    setActiveStep(0);
    setOrderConfirmed(false);
  };

  useEffect(() => {
    // Reset the stepper and order confirmation status when the component mounts
    handleReset();
  }, []);

  // Render the content for each step
  const getStepContent = (stepIndex) => {
    // Implement the content for each step here based on the stepIndex
    // For example, you can create a form for order details, shipping address, etc.
    // You can also display a confirmation message on the last step

    // For illustration purposes, let's just display a simple message on each step
    switch (stepIndex) {
      case 0:
        return <Typography variant="h3">Order Details Step</Typography>;
      case 1:
        return <Typography variant="h3">Shipping Address Step</Typography>;
      case 2:
        return orderConfirmed ? (
          <Typography variant="h3">Your order is confirmed.</Typography>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>{getStepContent(activeStep)}</div>
        <div>
          {activeStep === steps.length - 1 ? (
            // Display the Place Order button on the last step
            <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          ) : (
            // Display the Next and Back buttons on other steps
            <>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateOrderPage;
