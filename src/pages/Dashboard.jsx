import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import { Account, Authnav } from "../components";
import { getUserAccounts, selectUserAccounts } from "../features/accountSlice";

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accessToken = getAccessToken();

	const userAccounts = useSelector(selectUserAccounts);

	useEffect(() => {
		dispatch(getUserAccounts());
		document.title = "Meta - Dashboard";
	}, [dispatch]);

	useEffect(() => {
		if (userAccounts) {
			console.log(userAccounts);
		}
	}, [userAccounts]);

	return (
		<div>
			<Authnav />
			<Account account={userAccounts} />
		</div>
	);
};

export default Dashboard;
