// Transcript.jsx
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OSOx7SFBXwGHscxGmqjo3gRON1QEAb49FfCJEMtKVNomQnt5ng3tFqN8mLEDpMUtiRMtCXAxgU3Spna4xPQwlYR00ngw58lHY"
);

const Transcript = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentStatus = (status) => {
    setPaymentStatus(status);
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  const innerContainerStyle = {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "100%", // Adjusted width to be responsive
    maxWidth: "400px",
    height: "250px",
    backgroundColor: "#333",
    color: "#fff",
  };

  const statusStyle = {
    color: paymentStatus === "Success" ? "green" : "red",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h2>Stripe Payment Page</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm onPaymentStatus={handlePaymentStatus} />
        </Elements>

        <div>
          <h3 style={statusStyle}>Payment Status: {paymentStatus}</h3>
        </div>
      </div>
    </div>
  );
};

export default Transcript;
