import { BsFillBagFill } from "react-icons/bs";
import Rating from "./Rating";
import "../styles/Card.css"
import { Link } from "react-router-dom";
import ProductDetails from "../screens/ProductDetails";
import arimage from "../assets/ARICON.jpeg"
import {
  listProductDetails,
} from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";




const Card = ({ image, name, numReviews, price,id }) => {
  const productDetails = useSelector((state) => state.productDetails);
const { product } = productDetails;
  return (
    <>
      <section className="card">
        <Link to={`/productspage/${id}`}>
        <img src={image} alt={name} className="card-img" />

        <div className="card-details"></div>
          <h3 className="card-title">{name}</h3>
          </Link>
          <section className="card-reviews">
          <Rating value={numReviews} text={`  -> ${numReviews} reviews`} color={'#f8e825'} />
        
          </section>
          <section className="card-price">
            <div className="price">
            ₹{price}
            </div>
            <div className="bag">
            <Link to={`/ar-viewer?model=${product.modelFile?.replace('/media', '').replace(/^\/models\//, '')}`}>
              
              AR
              </Link> 
            </div>
          </section>
       
      </section>
    </>
  );
};

export default Card;
