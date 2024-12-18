import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate ,useLocation} from "react-router-dom";
import "../styles/Productdetails.css"; // Import the CSS file
import Rating from "../components/Rating";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/bgm.png"; // Background image for styling
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
} from "../actions/productActions";

function ProductDetails() {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);
  const modelFilename = query.get('model');  // Get model filename from query parameter
  console.log("Model filename:", modelFilename);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cartscreen/${id}?qty=${qty}`);
  };

/*   const view360Handler = () => {
    navigate(`/product/${id}/360view`); // Navigate to 360° view page
  }; */

  return (
    <div className="prodetails">
      <Navbar />
      <Link to="/productspage" className="backbtn">
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

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="product-details">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-info">
            <h3>{product.name}</h3>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
            <h2>
              <b>Price:</b> ₹{product.price}
            </h2>
            <p>
              <b>Description:</b> {product.description}
            </p>
            <button
              className="cartbtn"
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
            {product.countInStock > 0 && (
              <div
                className="Qty"
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Qty</span>
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="product-stock">
            <b>
              <h2>Brand:</h2>
            </b>
            <p>{product.brand}</p>
            <b>
              <h2>Status:</h2>
            </b>
            <p>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>
            <Link to={`/ar-viewer?model=${product.modelFile?.replace('/media', '').replace(/^\/models\//, '')}`}>
            <button className="threesixtybtn" >
              View in AR
            </button></Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
