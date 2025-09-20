import React, { useEffect } from "react";
import { Authnav } from "../components";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { MdLocationOn, MdMail, MdPhone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getUser, selectCurrentUser } from "../features/userSlice";
import Changepass from "../components/Changepass";

const styles = {
	profileText: "flex items-center gap-1 capitalize",
	spanText: "text-xs font-normal",
};

const Profile = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUser);

	//   console.log(user);

	useEffect(() => {
		dispatch(getUser());
	}, [, dispatch]);

	useEffect(() => {
		document.title = "Meta - User Profile";
	}, []);

	// useEffect(() => {
	// 	if (user) {
	// 		console.log(user);
	// 	}
	// }, [user]);
	return (
		<div className="min-h-screen mt-[90px]">
			<Authnav />
			<div className="w-full p-6 max-w-6xl mx-auto flex flex-col gap-6 bg-white ">
				<div className="flex flex-col gap-4">
					<h3 className="text-2xl font-bold py-2 border-b">User Profile</h3>

					<div className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl p-6 gap-6">
						{/* Avatar */}
						<figure className="w-full md:w-[25%] flex items-center justify-center">
							<FaUserCircle className="text-gray-400  text-7xl" />
						</figure>

						{/* Profile Details */}
						<div className="flex-1 flex flex-col gap-4 ">
							<div className="flex items-center gap-3">
								<FaUser className="text-blue-500 text-lg" />
								<p className="font-medium">
									<span className="font-semibold">Name:</span> {user?.firstname}{" "}
									{user?.lastname}
								</p>
							</div>

							<div className="flex items-center gap-3">
								<MdMail className="text-red-500 text-lg" />
								<p className="font-medium">
									<span className="font-semibold">Email:</span> {user?.email}
								</p>
							</div>

							<div className="flex items-center gap-3">
								<MdPhone className="text-green-500 text-lg" />
								<p className="font-medium">
									<span className="font-semibold">Phone:</span> {user?.phone}
								</p>
							</div>

							<div className="flex items-center gap-3">
								<MdLocationOn className="text-purple-500 text-lg" />
								<p className="font-medium">
									<span className="font-semibold">Address:</span>{" "}
									{user?.address}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="">
					<h3 className=" capitalize text-2xl font-bold p-2 border-b">
						change password
					</h3>
					<Changepass />
				</div>
			</div>
		</div>
	);
};

export default Profile;
