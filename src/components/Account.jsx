import React from "react";
import { format } from "date-fns";
import Recentactivity from "./Recentactivity";
import numeral from "numeral";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import Maskednum from "./Maskednum";

const Accountgrid = ({ number, type, bal, showTrnxs }) => {
	return (
		<div className="w-full cursor-pointer " onClick={showTrnxs}>
			<div className="flex flex-col gap-4">
				<div className="w-full flex justify-between items-center">
					<h3 className="font-medium uppercase text-blue-700 whitespace-nowrap text-md">
						{type === "facebook premium checking"
							? "FB Premium Checking"
							: type === "account access boost (AAB)"
							? "AAB Account"
							: type}
					</h3>
					<span>
						<span
							className={`${
								type.includes("access") && bal > 0 ? "flex" : "hidden"
							}`}
						>
							-
						</span>{" "}
						${numeral(bal).format("0,0.00")}
					</span>
				</div>

				<div
					className={`font-bold text-md tracking-wide gap-0.5 flex justify-between items-center ${
						type.includes("access") && bal > 0
							? "text-red-500"
							: "text-slate-800"
					}`}
				>
					<Maskednum number={number} />
					<small className="capitalize font-thin">available balance</small>
				</div>
			</div>
		</div>
	);
};

const Account = ({ account }) => {
	const navigate = useNavigate();

	const viewActivity = (acct) => {
		const accountId = acct._id;

		navigate(`/transactions/${accountId}`);
	};
	// console.log(account);
	const currentDate = sessionStorage.getItem("lastLogin");
	const user = JSON.parse(sessionStorage.getItem("user"));

	return (
		<div className="">
			<div className="grid md:grid-cols-3 custom-height">
				<div className="lg:col-span-2 p-3 md:p-6 flex flex-col gap-8">
					<h3 className="text-xl md:text-2xl capitalize font-medium">
						account summary
					</h3>
					<div className="grid gap-4 md:grid-cols-2">
						{account.length > 0 &&
							account.map((acct, index) => {
								return (
									<div
										key={index}
										className="bg-white shadow-xl p-6 flex flex-col gap-3 w-full rounded-lg md:rounded-xl"
									>
										<Accountgrid
											type={acct.accountType}
											number={acct.accountNo}
											bal={acct.balance}
											showTrnxs={() => viewActivity(acct)}
										/>
									</div>
								);
							})}
					</div>
					<Recentactivity />
				</div>
				<div className="bg-slate-800 p-6 text-white flex flex-col items-center lg:items-start w-full rounded-md shadow-md">
					<h3 className="text-lg lg:text-xl font-semibold">
						Welcome {user?.username || ""}
					</h3>
					<small className="text-slate-300 mt-1">
						Your last login was on {currentDate}
					</small>
					<div className="mt-4">
						<Logout />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
