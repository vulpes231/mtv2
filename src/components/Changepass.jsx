import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/userSlice";

const styles = {
  label: "capitalize text-[#333]",
  input: "w-full p-3 placeholder:capitalize border",
};

const Changepass = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState(false);

  const { changePassError, changePassLoading, passwordChanged } = useSelector(
    (state) => state.user
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (!form.password && !form.newPassword && !form.confirmNewPassword) {
      setError("all fields required!");
      return;
    }
    if (form.newPassword !== form.confirmNewPassword) {
      setError("passwords do not match!");
      return;
    }
    dispatch(changePassword(form));
  };

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = 3000;
      setTimeout(() => {
        setError(false);
      }, timeout);
    }
    return () => clearInterval(timeout);
  }, [error]);

  useEffect(() => {
    if (changePassError) {
      setError(changePassError);
    }
  }, [changePassError]);

  useEffect(() => {
    let timeout;
    if (passwordChanged) {
      timeout = 3000;
      setTimeout(() => {
        window.location.reload();
      }, timeout);

      return () => clearTimeout(timeout);
    }
  }, [passwordChanged]);

  return (
    <div className="">
      <form className="flex flex-col gap-6 bg-white shadow-xl p-6">
        <div>
          <label className={styles.label} htmlFor="">
            password
          </label>
          <input
            type="text"
            placeholder="current password"
            onChange={handleInput}
            value={form.password}
            name="password"
            className={`${styles.input} ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="">
            new password
          </label>
          <input
            type="text"
            placeholder="new password"
            onChange={handleInput}
            value={form.newPassword}
            name="newPassword"
            className={`${styles.input} ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="">
            confirm new password
          </label>
          <input
            type="text"
            placeholder="confirm new password"
            onChange={handleInput}
            value={form.confirmNewPassword}
            name="confirmNewPassword"
            className={`${styles.input} ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {error && (
          <p className="bg-red-100 text-red-500 p-2 capitalize">{error}</p>
        )}
        {passwordChanged && (
          <p className="bg-green-100 text-green-500 p-2 capitalize">
            password updated.
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-3 uppercase"
        >
          {!changePassLoading ? "change password" : "wait..."}
        </button>
      </form>
    </div>
  );
};

export default Changepass;
