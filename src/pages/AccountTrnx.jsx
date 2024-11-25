import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Authnav } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getAcctTrnxs } from "../features/transactionSlice";
import numeral from "numeral";
import Accountaccess from "../components/Accounaccess";

const headers = [
  { id: 1, name: "date" },
  { id: 2, name: "description" },
  { id: 3, name: "amount" },
  { id: 4, name: "balance" },
];

const AccountTrnx = () => {
  const dispatch = useDispatch();
  const { accountNo, accountType } = useParams();
  const accessToken = getAccessToken();
  const { acctTrnxs } = useSelector((state) => state.trnx);

  useEffect(() => {
    if (accessToken) {
      dispatch(getAcctTrnxs(accountNo));
    }
  }, [dispatch, accessToken, accountNo]);

  useEffect(() => {
    document.title = "Meta - Transactions";
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Authnav />
      <div className="p-6 w-full md:max-w-[900px] md:mx-auto">
        <div className=" bg-white p-4">
          <span className="flex justify-between items-center">
            <h3 className="py-4 font-bold text-xl uppercase text-blue-700">
              {accountType}
            </h3>
            <small className=" py-4 text-slate-400 uppercase">
              Transaction history
            </small>
          </span>
          <Accountaccess />
        </div>
        <div className="overflow-auto w-full bg-white rounded-sm shadow-xl">
          <table className="min-w-full divide-y-2 divide-slate-500">
            <thead className="bg-zinc-500 text-white font-medium uppercase">
              <tr>
                {headers.map((hdr) => (
                  <th className="px-4 py-2.5" key={hdr.id}>
                    {hdr.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {acctTrnxs?.trnxs?.map((data, index) => (
                <tr
                  key={data._id}
                  className={`text-xs font-medium  ${
                    index % 2 !== 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2.5 text-center">
                    <div className="flex flex-col gap-1">
                      <span>{data.date}</span>
                      <small className="text-slate-300">{data.time}</small>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-center capitalize">
                    {data.description}
                  </td>
                  <td className={`px-4 py-2.5 text-center text-green-500`}>
                    $
                    {numeral(parseFloat(data.amount).toFixed(2)).format(
                      "0,0.00"
                    )}
                  </td>
                  <td
                    className={`px-4 py-2.5 text-center ${
                      data.type === "credit" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    $
                    {numeral(parseFloat(data.balance).toFixed(2)).format(
                      "0,0.00"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountTrnx;
