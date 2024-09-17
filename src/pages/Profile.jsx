import React, { useEffect } from "react";
import { Authnav } from "../components";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { MdLocationPin, MdMail, MdPhone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getUser } from "../features/userSlice";
import Changepass from "../components/Changepass";

const styles = {
  profileText: "flex items-center gap-1 capitalize",
  spanText: "text-xs font-normal",
};

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  //   console.log(user);

  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    document.title = "Meta - Profile";
  }, []);
  return (
    <div className="bg-slate-50 custom-height">
      <Authnav />
      <div className="w-full p-6 lg:max-w-[900px] lg:mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold py-4 capitalize">
            User Profile
          </h3>
          <div className="flex flex-col gap-6 md:flex-row bg-white shadow-xl p-6">
            <figure className="w-full md:w-[20%] flex items-center justify-center">
              <FaUserCircle className=" text-xl md:text-5xl text-blue-500 " />
            </figure>
            <div className="flex flex-col gap-4 text-[#333]">
              <span className={styles.profileText}>
                <FaUser />
                <h5>
                  Name:{" "}
                  <span className={styles.spanText}>
                    {user?.user?.firstname} {user?.user?.lastname}
                  </span>{" "}
                </h5>
              </span>
              <span className={styles.profileText}>
                <MdMail />
                <h5>
                  email:{" "}
                  <span className={styles.spanText}>{user?.user?.email}</span>
                </h5>
              </span>
              <span className={styles.profileText}>
                <MdPhone />
                <h5>
                  phone:{" "}
                  <span className={styles.spanText}>{user?.user?.phone}</span>
                </h5>
              </span>
              <span className={styles.profileText}>
                <MdLocationPin />
                <h5>
                  address:{" "}
                  <span className={styles.spanText}>{user?.user?.address}</span>
                </h5>
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold py-4 capitalize">
            change password
          </h3>
          <Changepass />
        </div>
      </div>
    </div>
  );
};

export default Profile;
