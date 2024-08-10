import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="uppercase font-thin text-white">
      metasavings
    </Link>
  );
};

export default Logo;
