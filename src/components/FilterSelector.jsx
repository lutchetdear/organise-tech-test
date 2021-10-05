import React from "react";

const FilterSelector = ({ choices, changeHandler }) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    changeHandler(e.target.value);
  };

  return (
    <div className="filter-selector">
      <select onChange={handleChange}>
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
