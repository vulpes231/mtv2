import React from "react";

/* eslint-disable react/prop-types */
const Maskednum = ({ number }) => {
	const numStr = number.toString();

	if (numStr.length <= 4) {
		return <h5 className="font-normal">{numStr}</h5>;
	}

	const lastFour = numStr.slice(-4);
	const maskedPart = "X".repeat(numStr.length - 4);
	const maskedNumber = maskedPart + lastFour;

	return <h5 className="font-normal">{maskedNumber}</h5>;
};

export default Maskednum;
