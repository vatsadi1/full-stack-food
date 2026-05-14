// Verify.jsx

import React from "react";
import "./Verify.css";

function Verify() {
  return (
    <div className="verify-container">

      <div className="verify-card">

        <div className="verify-icon success">
          ✓
        </div>

        <h1>Payment Successful</h1>

        <p>
          Your order has been placed successfully.
          <br />
          Foodsy is preparing your delicious meal.
        </p>

        <div className="verify-status-box">

          <div className="status-row">
            <span>Payment Status</span>
            <span className="green">Paid</span>
          </div>

          <div className="status-row">
            <span>Estimated Delivery</span>
            <span>25-35 mins</span>
          </div>

          <div className="status-row">
            <span>Order Status</span>
            <span className="orange">Preparing</span>
          </div>

        </div>

        <div className="verify-buttons">

          <button
            className="primary-btn"
            onClick={() => (window.location.href = "/myorders")}
          >
            Track Order
          </button>

          <button
            className="secondary-btn"
            onClick={() => (window.location.href = "/")}
          >
            Back to Home
          </button>

        </div>

      </div>

    </div>
  );
}

export default Verify;