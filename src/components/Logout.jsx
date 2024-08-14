import React, { useEffect } from "react";
import { MdLock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/logoutSlice";
import { useNavigate } from "react-router-dom";
// MdLock

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedOut, logoutLoad, logoutError } = useSelector(
    (state) => state.logout
  );

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (loggedOut) {
      sessionStorage.clear();
      window.location.reload();
      // navigate("/");
    }
  }, [loggedOut]);

  return (
    <span
      onClick={handleLogout}
      className="underline flex items-center gap-1 cursor-pointer"
    >
      <MdLock /> {!logoutLoad ? "Sign out" : "Signing out..."}
    </span>
  );
};

export default Logout;
