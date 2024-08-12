import React, { useEffect, useState } from "react";
import Custominput from "./Custominput";
import { MdLock } from "react-icons/md";
import { loginUser } from "../features/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

const ErrorModal = ({ loginError }) => {
  return (
    <p className="text-red-500 rounded-sm font-thin text-xs absolute top-0 right-0 z-10 p-6 bg-white">
      {loginError}
    </p>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);

  const { loginLoading, loginError, accessToken } = useSelector(
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
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      timeout = 3000;
      setTimeout(() => {
        navigate("/dashboard");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [accessToken, navigate]);

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
      {loginError && <ErrorModal loginError={loginError} />}
      <button
        onClick={handleLogin}
        className="bg-blue-700 px-4 py-2.5 rounded-lg flex items-center gap-2 uppercase text-white"
      >
        <MdLock />
        {!loginLoading ? "login" : "logging in..."}
      </button>
    </form>
  );
};

export default LoginForm;
