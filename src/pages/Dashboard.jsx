import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import { Account, Authnav } from "../components";
import { getUserAccounts } from "../features/accountSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { userAccounts } = useSelector((state) => state.account);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      dispatch(getUserAccounts());
      document.title = "Dashboard";
    }
  }, [accessToken, navigate]);

  // console.log(accessToken);

  return (
    <div>
      <Authnav />
      <Account account={userAccounts} />
    </div>
  );
};

export default Dashboard;
