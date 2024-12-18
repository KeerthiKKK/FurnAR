import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgm from "../assets/bgm.png";
import "../styles/RegistrationPage.css";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message'
import { register } from '../actions/userActions'
import Footer from "../components/Footer";


const RegistrationPage = (location, history ) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
 // const [csrftoken, setCsrfToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const [message, setMessage] = useState('')

  const userRegister = useSelector((state) => state.userRegister)
  const { error,userInfo } = userRegister


//  const history = useNavigate();
/*   const appStyle = {
    backgroundImage: `url(${bgm})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "100vh",
    padding: "20px",
    position: "relative",
    color: "#fff",
  }; */

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  },[navigate,userInfo,redirect])

    const handleSubmit = (e) => {
      e.preventDefault()

      if (password !== confirmPassword) {
        setMessage('Passwords do not match')
    } else {
        dispatch(register(username, email, password))
    }
    }



  return (
    <div className="regcontainer">
      <div className="reg-form-box">
        <h2 className="login">Create Account</h2>
        {error && <Message variant='danger'>{error}</Message>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="repeatpassword" className="form-label">Repeat Password</label>
            <input type="password" className="form-control" id="repeatpassword" placeholder="Repeat Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" className="loginbutton">SignUp</button>
        </form>
        <p className="regbutton">
          Already a user? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                        </Link>
        </p>
        <Footer/>
      </div>
    </div>
  );
};

export default RegistrationPage;
