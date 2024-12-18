import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Footer from "../components/Footer";
import Message from "../components/Message";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const redirect = window.location.search ? window.location.search.split('=')[1] : '/';
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate('/admin/dashboard'); // Redirect admin to dashboard
      } else {
        navigate(redirect); // Redirect regular user to the original page
      }
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <div className="container">
        <div className="login-form-box">
          <h2 className="login">Login/Signup</h2>
          {error && <Message variant="danger">{error}</Message>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="email"
                name="username"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="loginbutton">
              Login
            </button>
          </form>
          <p className="regbutton">
            New user?{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register now!!
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
