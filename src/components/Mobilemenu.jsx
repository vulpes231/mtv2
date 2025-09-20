import React from "react";

import { MdAttachMoney, MdHome, MdHistory } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToggle } from "../features/navSlice";

const Mobilemenu = ({ location, links }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<div className="absolute top-[80px] right-[3px] p-6 flex flex-col gap-4 bg-white rounded-md sm:hidden">
			{links.map((link) => {
				const isActive = location.pathname === link.path;
				return (
					<span
						className={`flex items-center gap-1 capitalize text-sm cursor-pointer font-medium text-[12px] lg:text-14px ${
							isActive ? "text-blue-600" : "text-[#505050]"
						}`}
						key={link.id}
						onClick={() => {
							navigate(link.path);
							dispatch(setToggle());
						}}
					>
						<span>
							{link.name.includes("transfer") ? (
								<MdAttachMoney className="w-6 h-6" />
							) : link.name.includes("accounts") ? (
								<MdHome className="w-6 h-6" />
							) : link.name.includes("history") ? (
								<MdHistory className="w-6 h-6" />
							) : link.name.includes("profile") ? (
								<FaUserCircle className="w-6 h-6" />
							) : null}
						</span>
						<h6 className=" text-md md:text-lg">{link.name}</h6>
					</span>
				);
			})}
		</div>
	);
};

export default Mobilemenu;
