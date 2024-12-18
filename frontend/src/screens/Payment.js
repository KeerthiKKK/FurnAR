import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import "../styles/Payment.css";
import { Link } from 'react-router-dom';

function Payment() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('PayPal'); // Default to PayPal

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();

    // If Cash on Delivery is selected, update the order status accordingly
    if (paymentMethod === 'Cash on Delivery') {
      // You can add additional logic here if necessary for handling COD orders
      dispatch(savePaymentMethod('Cash on Delivery'));
    } else {
      dispatch(savePaymentMethod(paymentMethod)); // For PayPal or other methods
    }

    // Navigate to the order page
    navigate('/order');
  };

  return (
    <>
      <Link to="/cartscreen" className="backbtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="icon-back"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"
          />
          <path
            fillRule="evenodd"
            d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"
          />
        </svg>
      </Link>
      <div className="payment-container">
        <h1 className="payment-h1">Payment Method</h1>
        <form onSubmit={submitHandler} className="payment-form">
          <div className="form-group">
            <label className="pay-label">Select Method</label>
            <div className="radio-group">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={paymentMethod === 'Cash on Delivery'} // Disable PayPal if COD is selected
              />
              <label htmlFor="paypal">PayPal or Credit Card</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>
          </div>
          <button type="submit" className="pay-btn-primary">
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default Payment;
