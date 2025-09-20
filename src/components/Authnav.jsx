import React from "react";
import { MdAttachMoney } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const authLinks = [
	{
		id: 1,
		name: "transfer & pay",
		path: "/transfer",
	},
	{
		id: 2,
		name: "profile",
		path: "/profile",
	},
];

const Authnav = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<header className="h-[70px] fixed top-0 left-0 w-full bg-white shadow-sm flex items-center justify-center z-50">
			<nav className="w-full flex justify-between items-center p-4 max-w-6xl mx-auto">
				<Logo />
				<div className="flex gap-8 items-center">
					{authLinks.map((link) => {
						const isActive = location.pathname === link.path;
						return (
							<span
								className={`flex items-center gap-1 capitalize text-sm cursor-pointer font-medium text-[12px] lg:text-14px ${
									isActive ? "text-blue-600" : "text-[#333]"
								}`}
								key={link.id}
								onClick={() => navigate(link.path)}
							>
								<span>
									{link.name.includes("transfer") ? (
										<MdAttachMoney />
									) : link.name.includes("profile") ? (
										<FaUserCircle />
									) : null}
								</span>
								<span>{link.name}</span>
							</span>
						);
					})}
				</div>
			</nav>
		</header>
	);
};

export default Authnav;
