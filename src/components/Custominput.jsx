import React from "react";

const Custominput = ({
  type,
  placeholder,
  name,
  value,
  handleChange,
  customClass,
}) => {
  return (
    <input
      className={`p-2 ${customClass}  placeholder:capitalize outline-none border-none text-white`}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Custominput;
