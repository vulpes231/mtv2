import React from "react";
import {
	MdAttachMoney,
	MdHome,
	MdHistory,
	MdMenu,
	MdClose,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice, setToggle } from "../features/navSlice";
import Mobilemenu from "./Mobilemenu";

const authLinks = [
	{
		id: 1,
		name: "accounts",
		path: "/dashboard",
	},
	{
		id: 2,
		name: "transfer & pay",
		path: "/transfer",
	},
	{
		id: 3,
		name: "history",
		path: "/account",
	},
	{
		id: 4,
		name: "profile",
		path: "/profile",
	},
];

const Authnav = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const { toggle } = useSelector(selectNavSlice);

	return (
		<header className="h-[70px] fixed top-0 left-0 w-full bg-white shadow-sm flex items-center justify-center z-50">
			<nav className="w-full flex justify-between items-center p-4 max-w-7xl mx-auto">
				<Logo />
				<div className="hidden md:flex gap-8 items-center">
					{authLinks.map((link) => {
						const isActive = location.pathname === link.path;
						return (
							<span
								className={`flex items-center gap-1 capitalize text-sm cursor-pointer font-medium text-[12px] lg:text-14px ${
									isActive ? "text-blue-600" : "text-[#505050]"
								}`}
								key={link.id}
								onClick={() => navigate(link.path)}
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
				{toggle && <Mobilemenu location={location} links={authLinks} />}
				<span className="sm:hidden" onClick={() => dispatch(setToggle())}>
					{!toggle ? (
						<MdMenu className="w-6 h-6" />
					) : (
						<MdClose className="w-6 h-6" />
					)}
				</span>
			</nav>
		</header>
	);
};

export default Authnav;
