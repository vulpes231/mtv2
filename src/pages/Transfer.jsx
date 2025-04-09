import React, { useEffect } from "react";
import { Authnav } from "../components";
import Transferform from "../components/Transferform";

const Transfer = () => {
  useEffect(() => {
    document.title = "Meta - Transfer";
  }, []);
  return (
    <div className="bg-slate-50 min-h-screen">
      <Authnav />
      <Transferform />
    </div>
  );
};

export default Transfer;
