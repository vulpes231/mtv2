import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Authnav } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
	getAcctTrnxs,
	selectTransactionSlice,
} from "../features/transactionSlice";
import numeral from "numeral";
import Accountaccess from "../components/Accounaccess";
import {
	getAccountInfo,
	getUserAccounts,
	selectAccountInfo,
	selectAccountSlice,
} from "../features/accountSlice";
import { MdWallet } from "react-icons/md";
import { CiFilter } from "react-icons/ci";

const headers = [
	{ id: 1, name: "date" },
	{ id: 2, name: "description" },
	{ id: 3, name: "type" },
	{ id: 4, name: "amount" },
	{ id: 5, name: "balance" },
];

const AccountTrnx = () => {
	const dispatch = useDispatch();
	const { accountId } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [filter, setFilter] = useState({ filter: "", value: "" });

	const { acctTrnxs, acctTrnxsPagination, getAcctTrnxLoad } = useSelector(
		selectTransactionSlice
	);
	const { accountInfo } = useSelector(selectAccountSlice);
	const itemsPerPage = 10;

	const handleFilterChange = (e) => {
		setFilter({
			filter: "type", // or "account" depending on dropdown
			value: e.target.value,
		});
		setCurrentPage(1); // reset to first page when filter changes
	};

	useEffect(() => {
		if (accountInfo) {
			const num = accountInfo.accountNo;
			dispatch(
				getAcctTrnxs({
					filterBy: filter.filter,
					filterValue: filter.value,
					sortBy: "createdAt",
					page: currentPage,
					limit: itemsPerPage,
					accountNo: num,
				})
			);
		}
	}, [dispatch, currentPage, filter, accountInfo]);

	useEffect(() => {
		document.title = "Meta - Account Transactions";
	}, []);

	useEffect(() => {
		if (accountId) {
			dispatch(getAccountInfo(accountId));
		}
	}, [accountId, dispatch]);

	useEffect(() => {
		if (acctTrnxsPagination) {
			setCurrentPage(acctTrnxsPagination.currentPage);
		}
	}, [acctTrnxsPagination]);

	const handlePageChange = (pageNumber) => {
		if (pageNumber > 0 && pageNumber <= acctTrnxsPagination?.totalPage) {
			setCurrentPage(pageNumber);
		}
	};

	return (
		<div className=" min-h-screen mt-[80px]">
			<Authnav />

			<div className="p-2 lg:p-6 w-full max-w-7xl mx-auto flex flex-col gap-8">
				<div className="py-4 bg-white px-6 rounded-md md:rounded-lg shadow-md">
					<span className="flex justify-between items-center">
						<span>
							<span className="py-4">
								<h3 className="text-blue-700 text-lg md:text-xl uppercase font-semibold">
									{accountInfo?.accountType}
								</h3>
								<h3 className="flex items-center gap-2">
									{" "}
									<MdWallet className="w-7 h-7" /> $
									{numeral(accountInfo?.balance).format("0,0.00")}
								</h3>
							</span>
						</span>
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
					</span>
					{/* {accountType.includes("boost") && (
						<Accountaccess currentBal={accountBal} />
					)} */}
				</div>
				<div className="overflow-auto w-full bg-white rounded-sm shadow-xl">
					<table className="min-w-full divide-y-2 divide-slate-500">
						<thead className="bg-zinc-500 text-white font-medium uppercase">
							<tr>
								{headers.map((hdr) => (
									<th className="px-4 py-2.5" key={hdr.id}>
										{hdr.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{!getAcctTrnxLoad &&
								acctTrnxs &&
								acctTrnxs.length > 0 &&
								acctTrnxs.map((data, index) => (
									// console.log(data)
									<tr
										key={data._id}
										className={`text-xs font-medium  ${
											index % 2 !== 0 ? "bg-slate-50" : "bg-white"
										}`}
									>
										<td className="px-4 py-2.5 text-center">
											<div className="flex flex-col gap-1">
												<span>{data.date}</span>
												<small className="text-slate-300">{data.time}</small>
											</div>
										</td>
										<td className="px-4 py-2.5 text-center capitalize">
											{data.description}
										</td>
										<td className="px-4 py-2.5 text-center capitalize">
											{data.type}
										</td>
										<td className={`px-4 py-2.5 text-center text-green-500`}>
											$
											{numeral(parseFloat(data.amount).toFixed(2)).format(
												"0,0.00"
											)}
										</td>
										<td
											className={`px-4 py-2.5 text-center ${
												data.type === "credit"
													? "text-green-500"
													: "text-red-500"
											}`}
										>
											$
											{numeral(parseFloat(data.balance).toFixed(2)).format(
												"0,0.00"
											)}
										</td>
									</tr>
								))}
							{getAcctTrnxLoad && (
								<tr>
									<td
										colSpan={headers.length}
										className="px-6 py-8 text-center text-gray-400"
									>
										Fetching transactinons...
									</td>
								</tr>
							)}
							{!getAcctTrnxLoad && acctTrnxs?.length === 0 && (
								<tr>
									<td
										colSpan={headers.length}
										className="px-6 py-8 text-center text-gray-400"
									>
										No transactions found
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
					<div className="text-sm">
						Showing page{" "}
						<span className="font-medium ">
							{acctTrnxsPagination?.currentPage}
						</span>{" "}
						of{" "}
						<span className="font-medium ">
							{acctTrnxsPagination?.totalPage}
						</span>
					</div>

					<div className="flex gap-2">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1 || getAcctTrnxLoad}
							className="px-4 py-2 rounded-lg border text-sm bg-slate-500 text-[#fff] disabled:opacity-50 disabled:cursor-not-allowed transition"
						>
							Previous
						</button>
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={
								currentPage === acctTrnxsPagination?.totalPage ||
								getAcctTrnxLoad
							}
							className="px-4 py-2 rounded-lg border text-sm disabled:opacity-50 disabled:cursor-not-allowed transition bg-blue-500 text-[#fff]"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountTrnx;
