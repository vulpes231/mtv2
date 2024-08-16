import React from "react";
import { MdCurrencyExchange, MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";

const authLinks = [
  {
    id: 1,
    name: "transfer & pay",
    icon: <MdCurrencyExchange />,
    path: "/transfer",
  },
  {
    id: 2,
    name: "more",
    icon: <MdMenu />,
  },
];

const Authnav = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const goToDash = (e) => {
    e.preventDefault();
    if (accessToken) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <header className="w-full h-[60px]">
      <nav className="bg-white shadow-sm w-full flex justify-between items-center p-4">
        <h1
          onClick={goToDash}
          className="uppercase font-bold text-xl lg:text-2xl cursor-pointer"
        >
          meta<span className="text-blue-700">bank</span>
        </h1>
        <div className="flex gap-8 items-center">
          {authLinks.map((link) => {
            return (
              <Link
                className="flex items-center gap-2 capitalize"
                key={link.id}
                to={link.path}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Authnav;
