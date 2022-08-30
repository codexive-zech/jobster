import React from "react";

const FormRowSelect = ({
  name,
  value,
  handleChange,
  labelText,
  listOptions,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        className="form-select"
        value={value}
        onChange={handleChange}
      >
        {listOptions.map((listValue, index) => {
          return (
            <option value={listValue} key={index}>
              {listValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
