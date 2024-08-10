import React from "react";
import { Link } from "react-router-dom";

const Customlink = ({ path, name, custom }) => {
  return (
    <Link
      className={`px-5 py-2.5 rounded-3xl border-none outline-none ${custom}`}
      to={path}
    >
      {name}
    </Link>
  );
};

export default Customlink;
