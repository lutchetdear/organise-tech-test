import React from "react";
import "./filter-selector.styles.scss";

const FilterSelector = ({ choices, label, changeHandler }) => {
  const handleChange = (e) => changeHandler(e.target.value);

  return (
    <div className="filter-selector">
      <label>{label}</label>
      <select onChange={handleChange} className="form-select">
        <option value="all">All</option>
        {choices.map((choice) => (
          <option value={choice} key={choice}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelector;
