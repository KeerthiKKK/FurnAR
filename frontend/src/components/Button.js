const Button = ({ onClickHandler, value, name }) => {
  return (
    <button onClick={onClickHandler} value={value} className="btns">
      {name}
    </button>
  );
};

export default Button;
