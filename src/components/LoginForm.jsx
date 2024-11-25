import React, { useEffect, useState } from "react";
import Custominput from "./Custominput";
import { MdClose, MdLock } from "react-icons/md";
import { loginUser } from "../features/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const initialState = {
  username: "",
  password: "",
};

/* eslint-disable react/prop-types */
const ErrorModal = ({ loginError }) => {
  return (
    <div>
      <div className="flex justify-end">
        <MdClose className="text-slate-950" />
      </div>
      <p className="font-[Roboto] text-red-500 rounded-sm font-semibold tracking-wide text-xs absolute top-3 right-5 z-10 p-6 bg-white">
        {loginError}
      </p>
    </div>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(false);

  const { loginLoading, loginError, accessToken, user } = useSelector(
    (state) => state.login
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(loginUser(form));
  };

  useEffect(() => {
    let timeout;
    if (accessToken && user) {
      sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
      sessionStorage.setItem("user", JSON.stringify(user));
      timeout = 1000;
      setTimeout(() => {
        navigate("/dashboard");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [accessToken, navigate, user]);

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
        setError(false);
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
      {error && <ErrorModal loginError={error} />}
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
