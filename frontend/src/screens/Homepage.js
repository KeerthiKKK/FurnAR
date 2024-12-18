import React , {useState,useEffect}from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import backgroundImage from "../assets/bgmmmm.avif";
import Navbar from "../components/Navbar";
import "../styles/Homepage.css";
import Footer from "../components/Footer";


const appStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  
  backgroundPosition: "center -70px",
  minHeight: "100vh",
  padding: "20px",
  position: "relative",
  color: "#fff",
};

const Homepage = () => {

  const [products,setProducts] = useState([])

  useEffect(() => {

    async function fetchProducts(){
      const {data} = await axios.get("/api/products/")
      setProducts(data)

    }

    fetchProducts()


  },[])

  return (
    <div style={appStyle}>
      <Navbar />
      <h1 className="Smartsoln">
        {" "}
        Smart Solutions for
        <br></br> <p className="Modernliving">Modern Living</p>
        <br></br>
       
          <h2 className="h2">Browse Our Exclusive 3D Furniture Collection<br></br><Link to="/Productspage" ><button className="button">Explore Now</button></Link></h2>
          
       <h3 className="h3"> Find the perfect pieces to match your <br></br>style and see them in action before <br></br>making a decision.</h3>
      </h1>
      <Footer/>
    </div>
    
  );
};

export default Homepage;
