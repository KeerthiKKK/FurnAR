import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "../styles/dashboard.css"
import backgroundImage from "../assets/bgmmmm.avif";

const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    
    backgroundPosition: "center -70px",
    minHeight: "100vh",
    padding: "20px",
    position: "relative",
    color: "#fff",
  };
  
const AdminDashboard = () => {
  const navigate = useNavigate();

  return (

    <div style={appStyle}>
              <Link to="/" className="backbtn">
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
    <div className="admin-dashboard">
      <h1>Welcome, Admin</h1>
      <button className="admin-button" onClick={() => navigate("/report")}>View Report </button>
      <button className="admin-button" onClick={() => navigate("/profile")}>View Order History</button>
    </div>
    </div>
  );
};

export default AdminDashboard;
