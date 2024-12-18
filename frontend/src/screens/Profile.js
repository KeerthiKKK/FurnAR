import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 
import Message from "../components/Message"; 
import { getUserDetails, updateUserProfile } from "../actions/userActions"; 
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"; 
import { listMyOrders } from "../actions/orderActions"; 
import "../styles/Profile.css"; 

function Profile({ history }) {   
    const [name, setName] = useState("");   
    const [email, setEmail] = useState("");   
    const [password, setPassword] = useState("");   
    const [confirmPassword, setConfirmPassword] = useState("");   
    const [message, setMessage] = useState("");    

    const dispatch = useDispatch();    

    const getUserDetailsState = useSelector((state) => state.userDetails);   
    const { error, user } = getUserDetailsState || {};    

    const userLogin = useSelector((state) => state.userLogin);   
    const { userInfo } = userLogin;    

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);   
    const { success } = userUpdateProfile;    

    const orderListMy = useSelector((state) => state.orderListMy);   
    const { error: errorOrders, orders } = orderListMy;    

    useEffect(() => {     
        if (!userInfo) {       
            history.push("/login");     
        } else {       
            if (!user || !user.name || success || userInfo._id !== user._id) {         
                dispatch({ type: USER_UPDATE_PROFILE_RESET });         
                dispatch(getUserDetails("profile"));         
                dispatch(listMyOrders());       
            } else {         
                setName(user.name);         
                setEmail(user.email);       
            }     
        }   
    }, [dispatch, history, userInfo, user, success]);    

    useEffect(() => {
        if (success) {
            alert("User updated successfully!");  
        }
    }, [success]);

    const submitHandler = (e) => {     
        e.preventDefault();     
        if (!name || !email || !password || !confirmPassword) {       
            alert("Please fill in every field.");       
            return;      
        }      

        if (password !== confirmPassword) {       
            setMessage("Passwords don't match");     
        } else {       
            dispatch(         
                updateUserProfile({           
                    id: user._id,           
                    name,           
                    email,           
                    password,         
                })       
            );       
            setMessage("");    
        }   
    };    

    return (     
        <div className="profile-container">       
            <Link to="/" className="backbtn">         
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

            <div className="profile-form-section">         
                <h2 className="profile-form-section-h1">User Profile</h2>         
                {message && <Message variant="danger">{message}</Message>}         
                {error && <Message variant="danger">{error}</Message>}          

                <form className="profile-form" onSubmit={submitHandler}>           
                    <div className="form-group">             
                        <label>Name</label>             
                        <input               
                            type="text"               
                            id="name"               
                            placeholder="Enter name"               
                            value={name}               
                            onChange={(e) => setName(e.target.value)}               
                            required             
                        />           
                    </div>            

                    <div className="form-group">             
                        <label htmlFor="email">Email Address</label>             
                        <input               
                            type="email"               
                            id="email"               
                            placeholder="Enter Email"               
                            value={email}               
                            onChange={(e) => setEmail(e.target.value)}               
                            required             
                        />           
                    </div>            

                    <div className="form-group">             
                        <label htmlFor="password">Password</label>             
                        <input               
                            type="password"               
                            id="password"               
                            placeholder="Enter Password"               
                            value={password}               
                            onChange={(e) => setPassword(e.target.value)}             
                        />           
                    </div>            

                    <div className="form-group">             
                        <label htmlFor="confirmPassword">Confirm Password</label>             
                        <input               
                            type="password"               
                            id="confirmPassword"               
                            placeholder="Confirm Password"               
                            value={confirmPassword}               
                            onChange={(e) => setConfirmPassword(e.target.value)}             
                        />           
                    </div>            

                    <button type="submit" className="profile-btn">             
                        Update           
                    </button>         
                </form>       
            </div>        

            <div className="orders-section">         
                <h2 className="orders-section-h1">Orders</h2> 
                {/* Conditionally render "View Report" button for admins */}
                {userInfo && userInfo.isAdmin && (
                    <h2>
                        <Link to="/report">
                            <button className="report-btn">
                                View Report
                            </button>
                        </Link>
                    </h2>
                )}

                {errorOrders ? (           
                    <Message variant="danger">{errorOrders}</Message>         
                ) : (           
                    orders && orders.length > 0 ? (             
                        <table className="orders-table">               
                            <thead>                 
                                <tr>                   
                                    <th>ID</th>                                   
                                    <th>Total</th>                   
                                    <th>Paid</th>                   
                                    <th>Details</th>                   
                                    <th></th>                 
                                </tr>               
                            </thead>                

                            <tbody>                 
                                {orders.map((order) => (                   
                                    <tr key={order._id}>                     
                                        <td>A{order._id}</td>                                      
                                        <td>₹{order.totalPrice}</td>                     
                                        <td>                       
                                            {order.isPaid ? (                         
                                                order.paidAt.substring(0, 10)                       
                                            ) : (                         
                                                <i className="fas fa-times" style={{ color: "red" }}></i>                       
                                            )}                     
                                        </td>                      

                                        <td>                       
                                            <Link to={`/order/${order._id}`}>                         
                                                <button className="details-btn">Details</button>                       
                                            </Link>                     
                                        </td>                   
                                    </tr>                 
                                ))}               
                            </tbody>             
                        </table>           
                    ) : (             
                        <p>No orders found.</p>           
                    )         
                )}       
            </div>     
        </div>   
    );
}

export default Profile;
