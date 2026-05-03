import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Account, Authnav } from "../components";
import { getUserAccounts, selectUserAccounts } from "../features/accountSlice";
import NotifyUser from "./alert/NotifyUser";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(true);

  const handleIsOpen = () => {
    setShowAlert(!showAlert);
  };

  const userAccounts = useSelector(selectUserAccounts);

  useEffect(() => {
    dispatch(getUserAccounts());
    document.title = "Meta - Dashboard";
  }, [dispatch]);

  return (
    <section className="min-h-screen mt-[80px]">
      <Authnav />
      <div className="max-w-7xl mx-auto">
        {/* <NotifyUser isOpen={showAlert} setIsOpen={handleIsOpen} /> */}
      </div>
      <div className="max-w-7xl mx-auto">
        <Account account={userAccounts} />
      </div>
    </section>
  );
};

export default Dashboard;
