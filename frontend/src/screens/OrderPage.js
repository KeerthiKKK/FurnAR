import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import Message from '../components/Message';

import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';
import '../styles/OrderPage.css';

function OrderPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);
  const [paidViaCOD, setPaidViaCOD] = useState(false); // Track if the order was paid via COD

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const itemsPrice = order?.orderItems
    ? order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    : 0;

  const shippingPrice = order?.shippingPrice || 0;
  const taxPrice = order?.taxPrice || 0;
  const totalPrice = (parseFloat(itemsPrice) + parseFloat(shippingPrice) + parseFloat(taxPrice)).toFixed(2);

  const addPayPalScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://www.paypal.com/sdk/js?client-id=AQ-wSHolZjdzErmgdEnsyJt2rcrAgHYFUCnnc4KqmbawDaLEt0KqYniTxc_IB74isBhM5o7pIimjB44y';
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  // Handle COD payment status manually
  const handleCODPayment = () => {
    // Mark the order as paid via COD after button click
    const paymentResult = {
      status: 'COD', // Representing the payment method as COD
      transactionId: 'COD123', // A mock transaction ID for demonstration
    };
    dispatch(payOrder(orderId, paymentResult));
    setPaidViaCOD(true); // Update the state to reflect payment is made via COD
  };

  return loading ? (
    <></>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Link to="/profile" className="backbtn">
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

      <div className="order-page-container">
        <h1 className="orderpage-h1">Order: A{order._id}</h1>
        <div className="order-content">
          <div className="order-details">
            <div className="shipping-section">
              <h2 className="orderpage-h2">Shipping</h2>
              <p className="orderpage-p">
                <strong>Name:</strong> {order.user.name}
              </p>
              <p className="orderpage-p">
                <strong>Email:</strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p className="orderpage-p">
                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}, {order.shippingAddress.country},{' '}
                <br />
                Phone.no:{order.shippingAddress.postalCode},{' '}
              </p>
              {order.isDelivered ? (
                <Message variant="success">{order.deliveredAt}</Message>
              ) : (
                <Message variant="warning"></Message>
              )}
            </div>
            <div className="payment-section">
              <h2 className="orderpage-h2">Payment Method</h2>
              <p className="orderpage-p">
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {paidViaCOD ? (
                <Message variant="success">Paid via COD</Message> // Show COD message after button click
              ) : order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </div>
            <div className="items-section">
              <h2 className="orderpage-h2">Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <div className="items-list">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item-image"
                      />
                      <Link to={`/product/${item.product}`} className="item-name">
                        {item.name}
                      </Link>
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
            <h2 className="orderpage-h2">Order Summary</h2>
            <div className="summary-item">
              <div className="summary-item-left">Items:</div>
              <div className="summary-item-right">₹{itemsPrice}</div>
            </div>
            <div className="summary-item">
              <div className="summary-item-left">Shipping:</div>
              <div className="summary-item-right">₹{shippingPrice}</div>
            </div>
            <div className="summary-item">
              <div className="summary-item-left">Tax:</div>
              <div className="summary-item-right">₹{taxPrice}</div>
            </div>
            <div className="summary-item">
              <div className="summary-item-left">Total:</div>
              <div className="summary-item-right">₹{totalPrice}</div>
            </div>
            {!order.isPaid && order.paymentMethod === 'PayPal' && sdkReady && (
              <div className="payment-section">
                {!loadingPay ? (
                  <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                ) : (
                  <></>
                )}
              </div>
            )}
            {order.paymentMethod === 'Cash on Delivery' && !order.isPaid && (
              <div className="payment-section">
                <button className="btn" onClick={handleCODPayment}>
                  Mark as Paid (COD)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;
