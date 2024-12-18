import React from "react";
import { Routes, Route } from "react-router-dom"; // No need for Router here
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./screens/Homepage";
import ProductDetails from "./screens/ProductDetails";
import ContactPage from "./screens/ContactPage";
import Register from "./screens/RegistrationPage";
import Login from "./screens/LoginPage";
import Productpage from "./screens/Productpage";
import Shipping from "./screens/Shipping";
import CartScreen from "./screens/CartScreen";
import Profile from "./screens/Profile";
import ARPage from "./screens/ARpage";
import Payment from "./screens/Payment";
import Order from "./screens/Order";
import OrderPage from "./screens/OrderPage";
import ReportPage from "./screens/ReportPage";
import AdminDashboard from "./screens/AdminDashboard";
import AdminRoute from "./components/AdminRoute"; // Admin route protection
import PrivateRoute from "./components/PrivateRoute"; // Private route protection for authenticated users
import "./App.css";

// Background style for the app
const appStyle = {
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  minHeight: "100vh",
};

function App() {
  return (
    <div style={appStyle}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/productspage" element={<Productpage />} />
        <Route path="/productspage/:id" element={<ProductDetails />} />
        <Route path="/ar-viewer" element={<ARPage />} />
        <Route path="/contactpage" element={<ContactPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/shipping" element={<Shipping />} />

        {/* User Protected Routes */}
        <Route
          path="/cartscreen"
          element={
            <PrivateRoute>
              <CartScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/cartscreen/:id"
          element={
            <PrivateRoute>
              <CartScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order/:orderId" element={<OrderPage />} />
        <Route path="/order" element={<Order />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/report"
          element={
            <AdminRoute>
              <ReportPage />
            </AdminRoute>
          }
        />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
