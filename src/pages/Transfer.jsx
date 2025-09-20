import React, { useEffect } from "react";
import { Authnav } from "../components";
import Transferform from "../components/Transferform";

const Transfer = () => {
	useEffect(() => {
		document.title = "Meta - Transfer";
	}, []);
	return (
		<div className="min-h-screen mt-[90px]">
			<Authnav />
			<Transferform />
		</div>
	);
};

export default Transfer;
