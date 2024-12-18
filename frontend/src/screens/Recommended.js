import Button from "../components/Button";
import "../styles/Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <div className="recommended-flex">
      <Button onClickHandler={handleClick} value="" name="All Products" />
      <Button onClickHandler={handleClick} value="livingroom" name="Livingroom" />
      <Button onClickHandler={handleClick} value="bedroom" name="Bedroom" />
      <Button onClickHandler={handleClick} value="outdoor" name="Outdoor" />
      <Button onClickHandler={handleClick} value="garden" name="Garden" />
    </div>
  );
};

export default Recommended;
