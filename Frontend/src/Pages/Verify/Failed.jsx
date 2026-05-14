// PaymentFailed.jsx

import React from "react";
import "./Verify.css";

function PaymentFailed() {
  return (
    <div className="verify-container">

      <div className="verify-card">

        <div className="verify-icon failed">
          ✕
        </div>

        <h1>Payment Failed</h1>

        <p>
          Your payment could not be completed.
          <br />
          Please try again using another payment method.
        </p>

        <div className="verify-status-box">

          <div className="status-row">
            <span>Payment Status</span>
            <span className="red">Failed</span>
          </div>

          <div className="status-row">
            <span>Order Status</span>
            <span className="red">Cancelled</span>
          </div>

          <div className="status-row">
            <span>Reason</span>
            <span>Transaction Error</span>
          </div>

        </div>

        <div className="verify-buttons">

          <button
            className="primary-btn"
            onClick={() => (window.location.href = "/cart")}
          >
            Try Again
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

export default PaymentFailed;