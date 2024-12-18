import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from "react-redux";
import store from './store';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "@fortawesome/fontawesome-free";
import "@fortawesome/free-regular-svg-icons";
import "@fortawesome/react-fontawesome";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router> {/* Router wrapping the entire app */}
      <App />
    </Router>
  </Provider>
);

// For performance logging
reportWebVitals();
