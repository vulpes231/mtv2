import React from "react";
import Logo from "./Logo";
import Customlink from "./Customlink";
import Custominput from "./Custominput";

const navLinks = [
  {
    id: 1,
    name: "business",
  },
  {
    id: 2,
    name: "personal",
  },
  {
    id: 3,
    name: "mortgage center",
  },
  {
    id: 4,
    name: "why us",
  },
  {
    id: 5,
    name: "contact us",
  },
];

import { MdLock } from "react-icons/md";
const Navbar = () => {
  return (
    <header className="w-full">
      <nav className=" flex justify-between items-center bg-zinc-800 p-4">
        <Logo />

        <div>
          <form action="" className="flex items-center gap-6">
            <Custominput
              placeholder={"username"}
              customClass={"bg-opacity-20 bg-white placeholder:font-thin"}
            />
            <Custominput
              placeholder={"password"}
              customClass={"bg-opacity-20 bg-white placeholder:font-thin"}
            />
            <button className="bg-blue-700 px-4 py-2.5 rounded-lg flex items-center gap-2 uppercase text-white">
              <MdLock />
              login
            </button>
          </form>
          <Customlink
            path={"/signin"}
            name={"login"}
            custom={"flex md:hidden"}
          />
        </div>
      </nav>
      <div className="p-6 bg-zinc-100 flex justify-between">
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => {
            return (
              <li
                className="capitalize cursor-pointer hover:border-b-2 hover:border-blue-700"
                key={link.id}
              >
                {link.name}
              </li>
            );
          })}
        </ul>
        <span>+1 805 202-4259</span>
      </div>
    </header>
  );
};

export default Navbar;
