import React from "react";
import { Link } from "react-router-dom";
import { getAccessToken } from "../constants";

const Logo = () => {
	const token = getAccessToken();
	return (
		<Link
			to={token ? "/dashboard" : "/"}
			className="uppercase font-medium text-lg md:text-2xl text-blue-500"
		>
			meta <span className="text-white">bank</span>
		</Link>
	);
};

export default Logo;
