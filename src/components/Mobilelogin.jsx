import React, { useEffect, useState } from "react";
import Custominput from "./Custominput";
import { MdClose, MdLock } from "react-icons/md";
import { loginUser } from "../features/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

const ErrorModal = ({ loginError }) => {
  return (
    <p className="text-red-500 rounded-sm font-thin text-xs absolute top-0 right-0 z-10 px-4">
      {loginError}
    </p>
  );
};

const Mobilelogin = ({ closeModal }) => {
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
      sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
      timeout = 3000;
      setTimeout(() => {
        navigate("/dashboard");
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [accessToken, navigate]);

  return (
    <div className="absolute top-0 left-0 w-full flex flex-col items-center justify-center gap-4 z-10 bg-zinc-800 h-auto py-10 lg:hidden">
      <div className="relative w-full flex items-center justify-center text-white">
        <h3 className="uppercase">metabank</h3>
        <MdClose
          onClick={closeModal}
          className="absolute top-0 right-5 cursor-pointer text-xl "
        />
      </div>
      <form className="flex items-center flex-col gap-4 w-full px-6">
        <Custominput
          placeholder={"username"}
          customClass={"bg-opacity-20 bg-white placeholder:font-thin w-full"}
          handleChange={handleChange}
          value={form.username}
          name={"username"}
          type={"text"}
        />
        <Custominput
          placeholder={"password"}
          customClass={"bg-opacity-20 bg-white placeholder:font-thin w-full"}
          handleChange={handleChange}
          value={form.password}
          name={"password"}
          type={"password"}
        />
        {loginError && <ErrorModal loginError={loginError} />}
        <button
          onClick={handleLogin}
          className="bg-blue-700 px-4 py-2.5 rounded-sm flex items-center gap-2 uppercase text-white w-full justify-center"
        >
          <MdLock />
          {!loginLoading ? "login" : "logging in..."}
        </button>
      </form>
    </div>
  );
};

export default Mobilelogin;
