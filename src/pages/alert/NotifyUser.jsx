import React from "react";
import { FaX } from "react-icons/fa6";

const NotifyUser = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`bg-yellow-500/20 my-4 py-4 px-8 rounded-md shadow-sm ${
        isOpen ? "flex flex-col md:flex-row gap-2" : "hidden"
      } items-center justify-between text-yellow-500 `}
    >
      <span className="text-md md:text-lg font-normal md:font-medium text-center md:text-left">
        {" "}
        $5000 deposit for limited access on Meta Premium Checking Account
      </span>
      <span
        onClick={setIsOpen}
        className="flex items-center gap-1 font-semibold underline cursor-pointer"
      >
        <FaX size={16} />
        Close
      </span>
    </div>
  );
};

export default NotifyUser;
