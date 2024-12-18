import Category from "./Category";
import Price from "./Price";
import "../styles/Sidebar.css"

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>
        <Category handleChange={handleChange} />
    {/*     <Price handleChange={handleChange} /> */}
      </section>
    </>
  );
};

export default Sidebar;
