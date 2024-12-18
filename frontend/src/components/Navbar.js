import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import "../styles/Navbar.css";

const Navbar = ({ handleInputChange, query }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <b>FurnAR</b>
        </Link>

        <div className="nav-container">
          {location.pathname === "/Productspage" && (
            <input
              className="search-input"
              type="text"
              onChange={handleInputChange}
              value={query}
              placeholder="Search"
            />
          )}
        </div>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              <b>Home</b>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/Productspage" className="navbar-link">
              <b>Products</b>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/ContactPage" className="navbar-link">
              <b>Contact</b>
            </Link>
          </li>
        </ul>

        <div className="navbar-auth">
          <Link to="/cartscreen/" className="navbar-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
            </svg>
          </Link>
          {userInfo ? (
            <>
              <Link to={userInfo.isAdmin ? "/profile" : "/profile"} className="navbar-link">
                <b>{userInfo.name}</b>
              </Link>
              <button className="navbar-link navbar-logout-btn" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-link navbar-login-btn">
              <b>Login</b>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
