import React from "react";
import { Link } from "react-router-dom";
import { getAccessToken } from "../constants";
import { logo } from "../assets";

const Logo = () => {
	const token = getAccessToken();
	return (
		<Link
			to={token ? "/dashboard" : "/"}
			className="uppercase font-black text-lg md:text-2xl text-blue-500 flex items-center gap-2"
		>
			<img src={logo} alt="logo" className="w-[40px] block" />
			meta <span className="text-[#333]">bank</span>
		</Link>
	);
};

export default Logo;
