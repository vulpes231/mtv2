import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className="uppercase font-medium text-lg md:text-2xl text-blue-500"
    >
      meta <span className="text-white">bank</span>
    </Link>
  );
};

export default Logo;
