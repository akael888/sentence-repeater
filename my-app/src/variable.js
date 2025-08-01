const Variable = ({ mainText, mainTextChange }) => {
  return (
    <div className="variable-container">
      <input
        type="text"
        value={mainText}
        onChange={mainTextChange}
      />
    </div>
  );
};

export default Variable;