import React from "react";
import { format } from "date-fns";
import Recentactivity from "./Recentactivity";
import numeral from "numeral";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import Maskednum from "./Maskednum";

const Accountgrid = ({ number, type, bal, showTrnxs }) => {
	return (
		<div className="w-full cursor-pointer" onClick={showTrnxs}>
			<div className="flex justify-between items-center">
				<div>
					<h3 className="font-medium uppercase text-blue-700">{type}</h3>
					<Maskednum number={number} />
				</div>
				<div>
					<h3
						className={`font-bold text-md tracking-wide flex items-center gap-0.5 ${
							type.includes("access") && bal > 0
								? "text-red-500"
								: "text-slate-800"
						}`}
					>
						<span
							className={`${
								type.includes("access") && bal > 0 ? "flex" : "hidden"
							}`}
						>
							-
						</span>{" "}
						${numeral(bal).format("0,0.00")}
					</h3>
					<small className="capitalize font-thin">available balance</small>
				</div>
			</div>
		</div>
	);
};

const Account = ({ account }) => {
	const navigate = useNavigate();

	const viewActivity = (acct) => {
		const accountNo = acct.accountNo;
		console.log(acct);
		navigate(`/transactions/${accountNo}`);
	};
	// console.log(account);
	const currentDate = sessionStorage.getItem("lastLogin");
	const user = JSON.parse(sessionStorage.getItem("user"));

	return (
		<div className="bg-slate-50 ">
			<div className="grid md:grid-cols-3 custom-height">
				<div className="lg:col-span-2 p-6 flex flex-col gap-4">
					<h3 className="text-lg md:text-xl capitalize">account summary</h3>
					<div className="grid gap-4 md:grid-cols-2">
						{account.length > 0 &&
							account.map((acct, index) => {
								return (
									<div
										key={index}
										className="bg-white shadow-xl p-6 flex flex-col gap-3 rounded-sm w-full"
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
				<div className="bg-zinc-800 p-6 text-white flex flex-col items-center lg:justify-start w-full ">
					<h3 className="text-lg lg:text-xl capitalize ">
						Welcome {user?.username || ""}
					</h3>
					<small className="font-thin">
						Your last login was on {currentDate}
					</small>
					<Logout />
				</div>
			</div>
		</div>
	);
};

export default Account;
