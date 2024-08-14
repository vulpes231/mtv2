import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getUserAccounts } from "../features/accountSlice";
import { getUserTrnxs } from "../features/transactionSlice";
import numeral from "numeral";

const headers = [
  { id: 1, name: "date" },
  { id: 2, name: "description" },
  { id: 3, name: "amount" },
  { id: 4, name: "balance" },
];

const Transactions = () => {
  const { userTrnxs } = useSelector((state) => state.trnx);
  const { userAccounts } = useSelector((state) => state.account);

  const [displayOption, setDisplayOption] = useState("all");

  //   console.log(userAccounts);

  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserAccounts());
      dispatch(getUserTrnxs());
    }
  }, [dispatch, accessToken]);

  const myAccounts = userAccounts?.accounts?.map((acct) => {
    return (
      <option className="uppercase " key={acct._id} value={acct.accountNo}>
        {`${acct.accountType} - ${acct.accountNo}`}
      </option>
    );
  });
  return (
    <section className="w-full p-6">
      <div className="w-full lg:w-[1000px] lg:mx-auto flex flex-col gap-6">
        <div className="flex gap-1 justify-between items-start capitalize">
          <h3 className="text-md md:text-lg capitalize">Transactions</h3>
          <div className="flex flex-col">
            <label htmlFor="">select account</label>
            <select
              name="account"
              className="bg-transparent border p-2 uppercase"
            >
              <option value="">all</option>
              {myAccounts}
            </select>
          </div>
        </div>

        {/* table */}
        <div className="overflow-auto bg-white">
          <table className="min-w-full">
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
              {userTrnxs?.userTransactions?.map((data, index) => (
                <tr
                  key={data._id}
                  className={`text-xs font-medium ${
                    index % 2 !== 0 ? "bg-slate-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2.5 text-center">
                    <div className="flex gap-1 flex-col items-center">
                      <small className="font-thin text-gray-400">
                        {data.time}
                      </small>
                      <span>{data.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-center capitalize">
                    {data.description}
                  </td>
                  <td
                    className={`px-4 py-2.5 text-center ${
                      data.type === "credit" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    $
                    {numeral(parseFloat(data.amount).toFixed(2)).format(
                      "0,0.00"
                    )}
                  </td>
                  <td className={`px-4 py-2.5 text-center`}>
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
    </section>
  );
};

export default Transactions;
