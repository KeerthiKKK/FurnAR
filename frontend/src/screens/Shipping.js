import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import "../styles/Shipping.css";
import Navbar from '../components/Navbar';

function Shipping() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  /* const [phoneno, setphoneno] = useState(shippingAddress.phoneno || ''); */

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <>
      <Navbar />
      <Link to="/cartscreen" className="ship-backbtn">
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
      <div className="shipping-container">
        <h1 className='ship-h1'>Shipping</h1>
        <form onSubmit={submitHandler} className="shipping-form">
          <div className="ship-form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="ship-form-group">
            <label htmlFor="city">City</label>
  
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              pattern="[A-Za-z]+" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              oninput="this.value = this.value.replace(/[^A-Za-z]/g, '')"
              required
            />
          </div>
          <div className="ship-form-group">
            <label htmlFor="postalCode">Phoneno</label>
            <input
              type="number"
              id="postalCode"
              placeholder="Enter phoneno"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="ship-form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              pattern="[A-Za-z]+" 
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              oninput="this.value = this.value.replace(/[^A-Za-z]/g, '')"
              required
            />
          </div>
        {/*   <div className="ship-form-group">
            <label htmlFor="phoneno">Phoneno</label>
            <input
              type="tel"
              id="phoneno"
              placeholder="Enter phone no"
              value={phoneno}
              onChange={(e) => setphoneno(e.target.value)}
              required
            />
          </div> */}
          <button type="submit" className="ship-btn-primary">Continue</button>
        </form>
      </div>
    </>
  );
}

export default Shipping;
