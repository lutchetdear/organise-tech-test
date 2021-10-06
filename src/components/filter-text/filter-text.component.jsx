import React from "react";
import "./filter-text.styles.scss";

const FilterText = ({ label, changeHandler }) => {
  const handleChange = (e) => changeHandler(e.target.value);

  return (
    <div className="filter-text">
      <label>{label}</label>
      <input
        className="form-control"
        type="text"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default FilterText;
