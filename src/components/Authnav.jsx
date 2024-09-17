import React, { useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";

const authLinks = [
  {
    id: 1,
    name: "transfer & pay",
    path: "/transfer",
  },
  {
    id: 2,
    name: "profile",
    path: "/profile",
  },
];

const Authnav = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const [active, setActive] = useState(false);

  const handleActive = (item) => {
    setActive(item);
  };

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
                className={`flex items-center gap-1 capitalize text-sm ${
                  active === link.id ? "text-blue-600" : "text-[#333]"
                }`}
                key={link.id}
                to={link.path}
                onClick={() => handleActive(link.id)}
              >
                <span>
                  {link.name.includes("transfer") ? (
                    <MdAttachMoney />
                  ) : link.name.includes("profile") ? (
                    <FaUserCircle />
                  ) : null}
                </span>
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
