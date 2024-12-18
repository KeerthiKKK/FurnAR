import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ReportPage.css';

function ReportPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('month');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/report/monthly/');
            setReportData(response.data);
            setFilteredOrders(response.data.orders_per_month || []);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    fetchReportData();
  }, []);

  useEffect(() => {
    if (reportData) {
      switch (filterType) {
        case 'month':
          setFilteredOrders(reportData.orders_per_month || []);
          break;
        case 'day':
          setFilteredOrders(reportData.orders_per_day || []);
          break;
        case 'year':
          setFilteredOrders(reportData.orders_per_year || []);
          break;
        default:
          setFilteredOrders(reportData.orders_per_month || []);
      }
    }
  }, [filterType, reportData]);

  return (
    <div className="report-page">
      {loading ? (
        <p>Loading report...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <div className="report-content">
          <h1>Order Report</h1>

          <div className="filter-container">
            <label htmlFor="filter-type">Group Orders By:</label>
            <select
              id="filter-type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="month">Month</option>
              <option value="day">Day</option>
              <option value="year">Year</option>
            </select>
          </div>

          <section className="summary-section">
            <h2>Summary</h2>
            <p>
              Total Orders: {Array.isArray(filteredOrders) ? filteredOrders.reduce((sum, item) => sum + (item.order_count || 0), 0) : 0}
            </p>
            <p>
              Total Revenue: ₹
              {Array.isArray(filteredOrders)
                ? filteredOrders.reduce((sum, item) => sum + (parseFloat(item.total_revenue) || 0), 0).toFixed(2)
                : '0.00'}
            </p>
          </section>

          <section className="detailed-orders">
            <h2>Detailed Orders</h2>
            {Array.isArray(filteredOrders) && filteredOrders.length > 0 ? (
              filteredOrders.map((item, index) => (
                <div key={index} className="order-card">
                  <h3>Order Name: {item.product__name}</h3>
                  {/* Displaying products for each order */}
                  {Array.isArray(item.items) && item.items.length > 0 ? (
                    item.items.map((orderItem, idx) => (
                      <div key={idx}>
                        <p><strong>Product Name: {orderItem.product_name || 'No product name'}</strong></p>
                        <p>Quantity: {orderItem.qty}</p>
                        <p>Price: ₹{orderItem.price}</p>
                      </div>
                    ))
                  ) : (
                    <p>No products found for this order.</p>
                  )}

                  <p>Order Count: {item.order_count || 0}</p>
                  <p>Total Revenue: ₹{(parseFloat(item.total_revenue) || 0).toFixed(2)}</p>
                  <ul>
                    <li>Customer Name: {item['user__first_name']} {item['user__last_name']}</li>
                    <li>Payment Status: {item.isPaid ? 'Paid' : 'Not Paid'}</li>
                  </ul>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </section>

          <section className="top-products">
            <h2>Top-Selling Products</h2>
            {Array.isArray(reportData.top_selling_products) && reportData.top_selling_products.length > 0 ? (
              <ul>
                {reportData.top_selling_products.map((item, index) => (
                  <li key={index}>
                    <strong>{item.product__name}</strong>: {item.total_qty_sold} sold
                    <br />
                    <span>Price: ₹{item.product__price}</span>
                    <br />
                    {item.product__image && (
                      <img 
                        src={item.product__image} 
                        alt={item.product__name} 
                        style={{ maxWidth: '100px', maxHeight: '100px' }} 
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No top-selling products found.</p>
            )}
          </section>

        </div>
      )}
    </div>
  );
}

export default ReportPage;
