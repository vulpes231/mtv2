import React, { useEffect } from "react";
import { Authnav } from "../components";
import Transactions from "../components/Transactions";

const Detail = () => {
  useEffect(() => {
    document.title = "Transactions";
  }, []);
  return (
    <div className="bg-slate-50 h-full">
      <Authnav />
      <Transactions />
    </div>
  );
};

export default Detail;
