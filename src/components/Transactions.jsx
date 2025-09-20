import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getUserTrnxs,
	selectTransactionSlice,
} from "../features/transactionSlice";
import numeral from "numeral";
import { CiFilter } from "react-icons/ci";

const headers = [
	{ id: 1, name: "date" },
	{ id: 2, name: "description" },
	{ id: 3, name: "amount" },
	{ id: 4, name: "balance" },
];

const Transactions = () => {
	const { userTrnxs, userTrnxsPagination, getTrnxLoad } = useSelector(
		selectTransactionSlice
	);

	const dispatch = useDispatch();

	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const [filter, setFilter] = useState({ filter: "", value: "" });

	// Fetch accounts & transactions whenever page or filter changes
	useEffect(() => {
		dispatch(
			getUserTrnxs({
				filterBy: filter.filter,
				filterValue: filter.value,
				sortBy: "createdAt",
				page: currentPage,
				limit: itemsPerPage,
			})
		);
	}, [dispatch, currentPage, filter]);

	// Keep page in sync with backend pagination
	useEffect(() => {
		if (userTrnxsPagination) {
			setCurrentPage(userTrnxsPagination.currentPage);
		}
	}, [userTrnxsPagination]);

	const handlePageChange = (pageNumber) => {
		if (pageNumber > 0 && pageNumber <= userTrnxsPagination?.totalPage) {
			setCurrentPage(pageNumber);
		}
	};

	// Example filter handler (type filter)
	const handleFilterChange = (e) => {
		setFilter({
			filter: "type", // or "account" depending on dropdown
			value: e.target.value,
		});
		setCurrentPage(1); // reset to first page when filter changes
	};

	return (
		<section className="w-full p-6 min-h-screen">
			<div className="w-full lg:w-[1000px] lg:mx-auto flex flex-col gap-6">
				{/* Header + Filter */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h3 className="text-lg md:text-xl font-semibold">Transactions</h3>
						<h6 className="text-xs md:text-sm font-normal text-[#505050]">
							View your transaction history.
						</h6>
					</div>
					<div className="flex items-center gap-2">
						<label
							htmlFor="filter"
							className="text-sm font-medium flex items-center gap-2"
						>
							<span>
								<CiFilter />
							</span>{" "}
							Filter
						</label>
						<select
							id="filter"
							onChange={handleFilterChange}
							className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
						>
							<option value="">All</option>
							<option value="credit">Credit</option>
							<option value="debit">Debit</option>
						</select>
					</div>
				</div>

				{/* Table */}
				<div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
					<table className="min-w-full text-sm">
						<thead className="sticky top-0 bg-gradient-to-r from-gray-700 to-gray-600 text-white uppercase tracking-wide text-xs">
							<tr>
								{headers.map((hdr) => (
									<th key={hdr.id} className="px-6 py-3 text-left">
										{hdr.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{!getTrnxLoad &&
								userTrnxs &&
								userTrnxs.length > 0 &&
								userTrnxs.map((data, index) => (
									<tr
										key={data._id}
										className="border-b border-gray-300  hover:bg-slate-50 transition"
									>
										{/* Date */}
										<td className="px-6 py-4">
											<div className="flex flex-col">
												<span className="text-xs text-gray-400">
													{data.time}
												</span>
												<span className="font-medium ">{data.date}</span>
											</div>
										</td>

										{/* Description */}
										<td className="px-6 py-4 capitalize text-gray-700 dark:text-gray-300">
											{data.description}
										</td>

										{/* Amount */}
										<td
											className={`px-6 py-4 font-semibold ${
												data.type === "credit"
													? "text-green-500"
													: "text-red-500"
											}`}
										>
											$
											{numeral(parseFloat(data.amount).toFixed(2)).format(
												"0,0.00"
											)}
										</td>

										{/* Balance */}
										<td className="px-6 py-4 text-gray-700 dark:text-gray-300">
											$
											{numeral(parseFloat(data.balance).toFixed(2)).format(
												"0,0.00"
											)}
										</td>
									</tr>
								))}

							{userTrnxs?.length === 0 && (
								<tr>
									<td
										colSpan={headers.length}
										className="px-6 py-8 text-center text-gray-400"
									>
										No transactions found
									</td>
								</tr>
							)}
							{getTrnxLoad && (
								<tr>
									<td
										colSpan={headers.length}
										className="px-6 py-8 text-center text-gray-400"
									>
										Fetching transactinons...
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
					<div className="text-sm">
						Showing page{" "}
						<span className="font-medium ">
							{userTrnxsPagination?.currentPage}
						</span>{" "}
						of{" "}
						<span className="font-medium ">
							{userTrnxsPagination?.totalPage}
						</span>
					</div>

					<div className="flex gap-2">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1 || getTrnxLoad}
							className="px-4 py-2 rounded-lg border text-sm bg-slate-500 text-[#fff] disabled:opacity-50 disabled:cursor-not-allowed transition"
						>
							Previous
						</button>
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={
								currentPage === userTrnxsPagination?.totalPage || getTrnxLoad
							}
							className="px-4 py-2 rounded-lg border text-sm disabled:opacity-50 disabled:cursor-not-allowed transition bg-blue-500 text-[#fff]"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Transactions;
