import React, { useState, useEffect } from "react";
import Products from "../screens/Products";
import Navbar from "../components/Navbar";
import Recommended from "./Recommended";
import Card from "../components/Card";
import Sidebar from "./Sidebar";
import bgm from "../assets/bgm.png";
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";

function Productpage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { error, loading, products } = productList;
  const location = useLocation();
  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "test") { // Category
      setSelectedCategory(value);
    } else if (name === "test2") { // Price
      setSelectedPrice(value);
    }
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredData = () => {
    let filteredProducts = products || [];  // Ensure products is an array

    // Filtering by search query
    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Applying category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category === selectedCategory || product.brand === selectedCategory
      );
    }

    // Applying price filter
    if (selectedPrice) {
      const price = parseFloat(selectedPrice);
      filteredProducts = filteredProducts.filter((product) => {
        const productPrice = parseFloat(product.price);
        if (price === 50) return productPrice <= 50;
        if (price === 100) return productPrice > 50 && productPrice <= 100;
        if (price === 150) return productPrice > 100 && productPrice <= 150;
        if (price === 200) return productPrice > 150;
        return true; // Show all products if no price filter is selected
      });
    }

    return filteredProducts.length > 0
      ? filteredProducts.map(({ _id, image, numReviews, price, name }) => (
          <Card key={_id} id={_id} image={image} name={name} numReviews={numReviews} price={price} />
        ))
      : <p>No products available.</p>;  // Fallback message if no products are available
  };

  const result = filteredData();

  return (
    <div className="productsmain">
      <Sidebar handleChange={handleChange} />
      <Navbar query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} /> {/* Pass handleClick here */}
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error fetching products: {error}</p>
      ) : (
        <Products result={result} />
      )}
    </div>
  );
}

export default Productpage;
