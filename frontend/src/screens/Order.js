import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link,useParams } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import Message from '../components/Message';
import '../styles/Order.css';

function Order() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const cart = useSelector((state) => state.cart);

  // Calculate prices
  const itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
  const taxPrice = Number(0.082 * itemsPrice).toFixed(2);
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  if (!cart.paymentMethod) {
    navigate('/payment');
  }

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigate, dispatch, order]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        /* phoneno: cart.phoneno, */
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <><Link to="/cartscreen" className="backbtn">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      fill="currentColor"
      className="bi bi-box-arrow-in-left"
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
    <div className="order-container">
      <div className="order-details">
        <div className="shipping-section">
          <h2 className='order-h2'>Shipping</h2>

          <p  className='order-p'>
            <strong><u>Address:</u></strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.country},<br></br> Phone.no: {cart.shippingAddress.postalCode}
          </p>
          {/* <p  className='order-p'>
            <strong><u>Phone.no:</u></strong> {cart.shippingAddress.phoneno}
          </p> */}
        </div>
        <div className="payment-section">
          <h2 className='order-h2'>Payment Method</h2>
          <p  className='order-p'>
            <strong><u>Method:</u></strong> {cart.paymentMethod}
          </p>
        </div>
        <div className="items-section">
          <h2 className='order-h2'>Order Items</h2>
          {cart.cartItems.length === 0 ? (
            <Message variant="info">Your cart is empty</Message>
          ) : (
            <div className="order-items-list">
              {cart.cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <Link to={`/product/{id}${item.product}`} className="item-name">{item.name}</Link>
                  <p className="item-price">
                    {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="order-summary">
        <h2 className='order-h2'>Order Summary</h2>
        <div className="summary-item">
          <span>Items:</span>
          <span>₹{itemsPrice}</span>
        </div>
        <div className="summary-item">
          <span>Shipping:</span>
          <span>₹{shippingPrice}</span>
        </div>
        <div className="summary-item">
          <span>Tax:</span>
          <span>₹{taxPrice}</span>
        </div>
        <div className="summary-item total">
          <span>Total:</span>
          <span>₹{totalPrice}</span>
        </div>
        {error && <Message variant="danger">{error}</Message>}
        <button
          type="button"
          className="place-order-button"
          disabled={cart.cartItems.length === 0}
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </div>
    </>
  );
}

export default Order;
