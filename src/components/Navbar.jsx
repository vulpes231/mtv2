import React, { useState } from "react";
import Logo from "./Logo";
import { MdClose, MdLock, MdMenu } from "react-icons/md";
import LoginForm from "./LoginForm";
import Mobilelogin from "./Mobilelogin";

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

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleMobileModal = () => {
    setShowMobileModal((prev) => !prev);
  };
  const closeMobilemodal = () => {
    setShowMobileModal(false);
  };

  return (
    <header className="w-full bg-zinc-800">
      <nav className=" flex justify-between items-center py-4 lg:py-6 lg:max-w-[1100px] mx-auto px-6 lg:px-0">
        <Logo />
        <div className="hidden lg:flex">
          <LoginForm />
        </div>
        <span className="lg:hidden">
          <button
            onClick={handleMobileModal}
            className="bg-blue-700 px-4 py-2.5 rounded-lg flex items-center gap-2 uppercase text-white"
          >
            <MdLock />
            login
          </button>
        </span>
        {showMobileModal && <Mobilelogin closeModal={closeMobilemodal} />}
      </nav>
      <div className="bg-zinc-100 lg:p-6 shadow-xl">
        <div className="lg:max-w-[1100px] mx-auto flex justify-between items-center">
          <span className="lg:hidden">
            <button
              onClick={handleToggle}
              className="bg-blue-700 px-4 py-2.5  flex items-center gap-2 capitalize text-white"
            >
              {!toggle ? <MdMenu /> : <MdClose />}
              menu
            </button>
          </span>
          {/* desktop menu */}
          <ul className="hidden lg:flex items-center gap-8">
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
          {/* mobile menu */}
          <ul
            className={
              toggle
                ? "absolute top-[103px] z-10 left-0 w-full h-auto bg-blue-700 text-white p-6 flex flex-col gap-6 shadow-xl lg:hidden"
                : "hidden"
            }
          >
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
          <h5 className="capitalize pr-5 lg:pr-0">
            call us: <span className="text-blue-500">+1 805 202-4259</span>
          </h5>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
