import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getUserTrnxs,
	selectTransactionSlice,
} from "../features/transactionSlice";
import numeral from "numeral";
import { Link } from "react-router-dom";

const headers = [
	{ id: 1, name: "Date" },
	{ id: 2, name: "Description" },
	{ id: 3, name: "Amount" },
];

const Recentactivity = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);

	const { userTrnxs } = useSelector(selectTransactionSlice);

	useEffect(() => {
		dispatch(
			getUserTrnxs({
				filterBy: "",
				filterValue: "",
				sortBy: "createdAt",
				page: currentPage,
				limit: 6,
			})
		);
	}, [dispatch, currentPage]);

	return (
		<div className="flex flex-col gap-4">
			{/* Header Section */}
			<div className="flex justify-between items-center px-3">
				<h3 className="text-lg md:text-xl font-semibold text-slate-800">
					Recent Activities
				</h3>
				<Link
					to={"/account"}
					className="text-blue-600 hover:text-blue-800 transition font-medium"
				>
					See all
				</Link>
			</div>

			{/* Table Section */}
			<div className="overflow-auto w-full bg-white rounded-lg shadow-md">
				<table className="min-w-full border-collapse">
					{/* Table Head */}
					<thead className="bg-slate-700 text-white uppercase text-sm">
						<tr>
							{headers.map((hdr) => (
								<th
									key={hdr.id}
									className="px-4 py-3 text-left tracking-wide font-medium"
								>
									{hdr.name}
								</th>
							))}
						</tr>
					</thead>

					{/* Table Body */}
					<tbody className="text-slate-700 text-sm">
						{userTrnxs && userTrnxs.length > 0 ? (
							userTrnxs.map((data, index) => (
								<tr
									key={data._id}
									className={`${
										index % 2 === 0 ? "bg-white" : "bg-slate-50"
									} hover:bg-slate-100 transition`}
								>
									<td className="px-4 py-3">{data.date}</td>
									<td className="px-4 py-3 capitalize">{data.description}</td>
									<td
										className={`px-4 py-3 font-semibold ${
											data.type === "credit" ? "text-green-600" : "text-red-600"
										}`}
									>
										$
										{numeral(parseFloat(data.amount).toFixed(2)).format(
											"0,0.00"
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={headers.length}
									className="px-4 py-6 text-center text-slate-500 italic"
								>
									No recent transactions found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Recentactivity;
