import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ReportPage.css';

function ReportPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('month'); // Default filter type
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/report/monthly/');
        setReportData(response.data);
        setFilteredOrders(response.data.orders_per_month); // Default to monthly data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  // Update filtered orders when filter type changes
  useEffect(() => {
    if (reportData) {
      switch (filterType) {
        case 'month':
          setFilteredOrders(reportData.orders_per_month);
          break;
        case 'day':
          setFilteredOrders(reportData.orders_per_day);
          break;
        case 'year':
          setFilteredOrders(reportData.orders_per_year);
          break;
        default:
          setFilteredOrders(reportData.orders_per_month);
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

          {/* Dropdown for filtering */}
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

          {/* Display filtered orders */}
          <section className="filtered-orders">
            <h2>
              Orders Grouped By{' '}
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </h2>
            <div className="report-grid">
              {/* Orders Table */}
              <table className="order-table">
                <thead>
                  <tr>
                    <th>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                    <th>Customer Name</th>
                    <th>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((item, index) => (
                    <tr key={index}>
                      <td>{item[filterType]}</td>
                      <td>{item.order_count} Orders</td>
                      <td>₹{item.total_revenue}</td>
                      <td>{item.user__first_name} {item.user__last_name}</td>
                      <td>{item.isPaid ? 'Paid' : 'Not Paid'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
