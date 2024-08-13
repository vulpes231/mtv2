import React from "react";
import { MdLock } from "react-icons/md";
import { format } from "date-fns";
import Recentactivity from "./Recentactivity";
import numeral from "numeral";

const Accountgrid = ({ number, type, bal }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium uppercase text-blue-700">{type}</h3>
          <h5 className="font-normal ">{number}</h5>
        </div>
        <div>
          <h3
            className={`font-bold text-md tracking-wide ${
              bal < 0 ? "text-red-500" : "text-slate-800"
            }`}
          >
            ${numeral(bal).format("0,0.00")}
          </h3>
          <small className="capitalize font-thin">available balance</small>
        </div>
      </div>
    </div>
  );
};

const Account = ({ account }) => {
  const viewActivity = (e) => {
    e.preventDefault();
  };

  const currentDate = format(new Date(), "yyyy/mm/dd\tHH:mm a");

  return (
    <div className="bg-slate-50 ">
      <div className="grid md:grid-cols-3 custom-height">
        <div className="col-span-2 p-6 flex flex-col gap-4">
          <h3 className="text-md md:text-lg capitalize">account summary</h3>
          <div className="flex flex-col gap-4 lg:flex-row">
            {account?.map((acct, index) => {
              return (
                <div
                  key={index}
                  className="bg-white shadow-xl p-6 flex flex-col gap-3 rounded-sm w-full"
                >
                  <Accountgrid
                    type={acct.account_type}
                    number={acct.account_num}
                    bal={acct.available_bal}
                  />

                  <button
                    onClick={viewActivity}
                    className="font-medium text-gray-300 uppercase text-[0.5rem] whitespace-nowrap flex justify-start"
                  >
                    view activity
                  </button>
                </div>
              );
            })}
          </div>
          <Recentactivity />
        </div>
        <div className=" bg-zinc-800 p-6 text-white flex flex-col items-center justify-start">
          <h3 className="text-lg lg:text-xl">Welcome user</h3>
          <small className="font-thin">
            Your last login was on {currentDate}
          </small>
          <span className="underline flex items-center gap-1">
            <MdLock /> Sign out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Account;
