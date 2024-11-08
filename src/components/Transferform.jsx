import React, { useEffect, useState } from "react";
import { getAccessToken } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserAccounts } from "../features/accountSlice";
import { getExternalAccs } from "../features/externalSlice";

/* eslint-disable react/prop-types */
const Formdiv = ({ children }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

const Input = ({ type, value, handleChange, name, placeHolder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      name={name}
      placeholder={placeHolder}
      className="w-full p-2 border outline-none focus:border-slate-500"
    />
  );
};

const Select = ({ value, handleChange, name, children }) => {
  return (
    <select
      value={value}
      onChange={handleChange}
      name={name}
      className="w-full p-2 border outline-none focus:border-slate-500 bg-transparent capitalize"
    >
      {children}
    </select>
  );
};

const initialState = {
  fromAccount: "",
  toAccount: "",
  amount: "",
  description: "",
};

const Transferform = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { userAccounts } = useSelector((state) => state.account);
  const { externalAccs } = useSelector((state) => state.external);

  const listFromAccounts = userAccounts?.accounts?.map((acct) => {
    return (
      <option
        key={acct._id}
        value={acct.accountNo}
      >{`${acct.accountType}`}</option>
    );
  });

  // console.log(externalAccs);

  const listExternalAccounts =
    externalAccs &&
    externalAccs.map((acct) => {
      return (
        <option
          key={acct._id}
          value={acct.account}
        >{`${acct.bank.toUpperCase()} - ${acct.account}`}</option>
      );
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    resetInput();
  };

  const resetInput = () => {
    setForm(initialState);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserAccounts());
      dispatch(getExternalAccs());
    }
  }, [accessToken, dispatch]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form className="flex flex-col gap-6 bg-white p-6 capitalize w-full md:w-[380px] md:mx-auto shadow-xl font-inherit">
        <div className="flex justify-between">
          <h3>Transfer</h3>
          <small className="underline text-blue-500">
            add external account
          </small>
        </div>
        <Formdiv>
          <label htmlFor="">
            from account <span className="text-red-500">*</span>{" "}
          </label>
          <Select
            name={"fromAccount"}
            value={form.fromAccount}
            handleChange={handleChange}
          >
            <option value="">select from account</option>
            {listFromAccounts}
          </Select>
        </Formdiv>
        <Formdiv>
          <label htmlFor="">
            to account <span className="text-red-500">*</span>{" "}
          </label>
          <Select
            name={"toAccount"}
            value={form.toAccount}
            handleChange={handleChange}
          >
            <option value="">external accounts</option>
            {listExternalAccounts}
          </Select>
        </Formdiv>
        <Formdiv>
          <label htmlFor="">
            amount <span className="text-red-500">*</span>
          </label>
          <Input
            type={"text"}
            name={"amount"}
            value={form.amount}
            handleChange={handleChange}
            placeHolder={"0.00"}
          />
        </Formdiv>
        <Formdiv>
          <label htmlFor="">memo (optional)</label>
          <Input
            type={"text"}
            name={"description"}
            value={form.description}
            handleChange={handleChange}
          />
        </Formdiv>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 p-2.5 capitalize border-none rounded-3xl text-white shadow-xl"
        >
          send
        </button>
      </form>
    </div>
  );
};

export default Transferform;
