import React, { useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Image, Form, Button } from "react-bootstrap"; 
import { addToCart, removeFromCart } from "../actions/cartActions";
import Navbar from "../components/Navbar";
import "../styles/Cartscreen.css";

function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  // Calculate derived values here instead of storing them in Redux
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div className="cart-container">
      <Navbar />
      <h1 className="cart-title">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="msg">
          Your cart is empty :/ <Link to="/">Go Back</Link>
        </p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className="cart-item">
                  <div className="cart-item-details">
                    <Link to={`/productspage/${item.product}`}>
                      <Image src={item.image} alt={item.name} className="cart-item-image" />
                    </Link>
                    <Link to={`/productspage/${item.product}`} className="cart-item-link">
                      {item.name}
                    </Link>
                    <p className="cart-item-price">₹{item.price}</p>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, Number(e.target.value)))
                      }
                      className="cart-quantity-select"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                    <Button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                      className="cart-remove-button"
                    >
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="cart-summary">
            <div className="summary-box">
              <h2 className="cart-h2">Price Summary ({totalItems} items)</h2>
              <p className="cart-p">Cart Total: ₹{totalPrice}</p>
              <p className="cart-p">Shipping & Handling: FREE</p>
              <h1 className="cart-h2">Total Amount: ₹{totalPrice}</h1>
              <h3 className="cart-p">(Inclusive of all taxes)</h3>
              <Button
                type="button"
                className="cart-checkout-button"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
