import "../styles/Category.css";
import Input from "../components/Input";
import Footer from "../components/Footer";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="livingroom"
          title="Livingroom"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="bedroom"
          title="Bedroom"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="diningroom"
          title="Diningroom"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="outdoor"
          title="Outdoor"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="garden"
          title="Garden"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="studyroom"
          title="Studyroom"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="kitchen"
          title="Kitchen"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="kids"
          title="Kids"
          name="test"
        />
      </div>
      <Footer/>
    </div>
  
  );
}

export default Category;
