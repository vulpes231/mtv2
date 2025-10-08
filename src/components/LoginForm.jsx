import React, { useEffect, useState } from "react";
import Custominput from "./Custominput";
import { MdClose, MdLock } from "react-icons/md";
import {
	loginUser,
	resetLogin,
	selectLoginSlice,
} from "../features/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Errortoast from "./Errortoast";
import Successttoast from "./Successtoast";

const initialState = {
	username: "",
	password: "",
};

/* eslint-disable react/prop-types */

const LoginForm = () => {
	const dispatch = useDispatch();
	const [form, setForm] = useState(initialState);
	const [error, setError] = useState("");

	const { loginLoading, loginError, accessToken } =
		useSelector(selectLoginSlice);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleLogin = (e) => {
		e.preventDefault();
		for (const key in form) {
			if (form[key] === "") {
				setError(`${key} required!`);
				return;
			}
		}
		dispatch(loginUser(form));
	};

	useEffect(() => {
		let timeout;
		if (accessToken) {
			sessionStorage.setItem("lastLogin", new Date());
			sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
			timeout = 1000;
			setTimeout(() => {
				dispatch(resetLogin());
				window.location.href = "/dashboard";
			}, timeout);
		}
		return () => clearTimeout(timeout);
	}, [accessToken]);

	useEffect(() => {
		if (loginError) {
			setError(loginError);
		}
	}, [loginError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = 3000;
			setTimeout(() => {
				setError("");
			}, timeout);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	return (
		<form className="flex items-center gap-6">
			<Custominput
				placeholder={"username"}
				customClass={"bg-opacity-20 bg-white placeholder:font-thin"}
				handleChange={handleChange}
				value={form.username}
				name={"username"}
				type={"text"}
			/>
			<Custominput
				placeholder={"password"}
				customClass={"bg-opacity-20 bg-white placeholder:font-thin"}
				handleChange={handleChange}
				value={form.password}
				name={"password"}
				type={"password"}
			/>
			{error && <Errortoast error={error} />}
			{accessToken && <Successttoast success={"Login Success."} />}
			<button
				onClick={handleLogin}
				className="bg-blue-700 px-4 py-2.5 rounded-lg flex items-center gap-2 uppercase text-white"
			>
				<MdLock />
				{"login"}
			</button>
			{loginLoading && <Modal />}
		</form>
	);
};

export default LoginForm;
