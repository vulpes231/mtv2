import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getUserTrnxs } from "../features/transactionSlice";
import numeral from "numeral";
import { Link } from "react-router-dom";

const headers = [
  { id: 1, name: "date" },
  { id: 2, name: "description" },
  { id: 3, name: "amount" },
];

const Recentactivity = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { userTrnxs } = useSelector((state) => state.trnx);

  // console.log(userTrnxs);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserTrnxs());
    }
  }, [dispatch, accessToken]);

  // Limit the transactions to a maximum of 9
  const transactionsToDisplay = userTrnxs?.userTransactions?.slice(0, 9) || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-3">
        <h3 className="text-lg md:text-xl capitalize">Recent Activities</h3>
        <Link to={"/account"} className="underline cursor-pointer">
          See all
        </Link>
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
            {transactionsToDisplay.map((data, index) => (
              <tr
                key={data._id}
                className={`text-xs font-medium  ${
                  index % 2 !== 0 ? "bg-slate-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-2.5 text-center">{data.date}</td>
                <td className="px-4 py-2.5 text-center capitalize">
                  {data.description}
                </td>
                <td
                  className={`px-4 py-2.5 text-center ${
                    data.type === "credit" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  $
                  {numeral(parseFloat(data.amount).toFixed(2)).format("0,0.00")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recentactivity;
