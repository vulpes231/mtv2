import React, { useEffect } from "react";
import { Authnav } from "../components";
import Transactions from "../components/Transactions";

const Detail = () => {
	useEffect(() => {
		document.title = "MetaBank - History";
	}, []);
	return (
		<section className="min-h-screen mt-[90px]">
			<Authnav />
			<Transactions />
		</section>
	);
};

export default Detail;
