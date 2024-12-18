const Input = ({ handleChange, value, title, name, checked }) => {
  return (
    <label className="sidebar-label-container">
      <input 
        onChange={handleChange} 
        type="radio" 
        value={value} 
        name={name} 
        checked={checked}  // This will ensure the radio button is selected if its value matches selectedValue
      />
      {title}
    </label>
  );
};

export default Input;

