// CheckoutForm.jsx
import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "antd";
import { Route, useNavigate } from "react-router-dom";

const CheckoutForm = ({ onPaymentStatus }) => {
  const stripe = useStripe();
  const elements = useElements();
  const route = useNavigate();

  const formStyle = {
    display: "grid",
    gridRowGap: "10px", // Adjusted grid row gap
    maxWidth: "300px",
    margin: "auto",
    backgroundColor: "#444",
    color: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
      onPaymentStatus("Error");
    } else {
      console.log(token);
      onPaymentStatus("Success");
      route("/user");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label>
        Card details
        <CardElement
          options={{ style: { base: { fontSize: "16px", color: "#fff" } } }}
        />
      </label>
      <Button type="submit" disabled={!stripe}>
        Pay
      </Button>
    </form>
  );
};

export default CheckoutForm;
