import React, { useEffect, useState } from "react";
import { getAccessToken } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserAccounts } from "../features/accountSlice";
import { getExternalAccs } from "../features/externalSlice";
import { Link } from "react-router-dom";

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
      className="w-full p-2 h-[42px] text-[16px] rounded-[5px] border outline-none focus:border-slate-500 font-medium text-[#213617]"
      autoComplete="off"
    />
  );
};

const Select = ({ value, handleChange, name, children }) => {
  return (
    <select
      value={value}
      onChange={handleChange}
      name={name}
      className="w-full p-2 h-[42px] text-[16px] rounded-[5px] border outline-none focus:border-slate-500 bg-white capitalize font-medium text-[#213617]"
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
    <div className="flex flex-col items-center gap-5 justify-center w-full h-full text-[#213615] mt-3 lg:mt-5">
      <div className="bg-white md:w-[480px] md:mx-auto p-6 flex flex-col gap-4 shadow-sm rounded-md font-medium text-md">
        <small className="text-[12px] font-normal text-[#979797]">
          <span className="text-red-500">*</span> First phase of{" "}
          <span>AAB (Account Access Boost)</span> <br /> is $63,000.00 and it
          gives you access to less than One Million USD.
        </small>
        <small className="text-[12px] font-normal text-[#979797]">
          <span className="text-red-500">*</span> Second phase of{" "}
          <span>AAB (Account Access Boost)</span> <br /> is $110,000.00 and it
          gives you access to the complete balance in your checking account.
        </small>
      </div>
      <form className="flex flex-col gap-6 bg-white p-6 capitalize w-full md:w-[480px] md:mx-auto shadow-xl font-inherit">
        <div className="flex justify-between">
          <h3 className="text-[18px] font-semibold">Transfer</h3>
          <Link className="underline text-blue-500">add external account</Link>
        </div>
        <hr className="lg:hidden" />
        <Formdiv>
          <label className="font-normal text-[#979797] text-[14px]" htmlFor="">
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
          <label className="font-normal text-[#979797] text-[14px]" htmlFor="">
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
          <label className="font-normal text-[#979797] text-[14px]" htmlFor="">
            amount <span className="text-red-500">*</span>
          </label>
          <Input
            type={"text"}
            name={"amount"}
            value={form.amount}
            handleChange={handleChange}
            placeHolder={"$0.00"}
          />
        </Formdiv>
        <Formdiv>
          <label className="font-normal text-[#979797] text-[14px]" htmlFor="">
            memo (optional)
          </label>
          <Input
            type={"text"}
            name={"description"}
            value={form.description}
            handleChange={handleChange}
          />
        </Formdiv>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 h-[42px] p-2.5 capitalize border-none rounded-[5px] text-white shadow-xl text-[16px] font-semibold"
        >
          send money
        </button>
      </form>
    </div>
  );
};

export default Transferform;
