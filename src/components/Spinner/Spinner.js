import "./style.css";
const Spinner = () => {
  return (
    <div className="lds-ring" data-testid="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
