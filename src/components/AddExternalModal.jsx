import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExternalAccount,
  resetAddExternal,
  selectExternalSlice,
} from "../features/externalSlice";
import Errortoast from "./Errortoast";
import Successttoast from "./Successtoast";

const AddExternalModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const { addExternalLoad, addExternalError, addExternalSuccess } =
    useSelector(selectExternalSlice);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      bankName: "",
      account: "",
      routing: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(addExternalAccount(values));
    },
  });

  useEffect(() => {
    if (addExternalError) setError(addExternalError);
  }, [addExternalError]);

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [error]);

  useEffect(() => {
    if (addExternalSuccess) {
      const tmt = setTimeout(() => {
        onClose();
        window.location.href = "/transfer";
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [addExternalSuccess]);
  return (
    <div className="w-screen h-screen bg-black/50 fixed flex items-center justify-center top-0 left-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
        }}
        className="bg-white shadow-md rounded-md p-6 flex flex-col gap-4 max-w-lg w-full"
      >
        <h4 className="text-[20px] font-bold mb-5">Add External Account</h4>
        <div className="flex flex-col gap-1">
          <label
            htmlFor=""
            className="capitalize font-medium text-slate-600 text-7"
          >
            bank name
          </label>
          <input
            type="text"
            className="px-2 border border-slate-300 py-2 rounded-md"
            autoComplete="off"
            onChange={validation.handleChange}
            value={validation.values.bankName}
            name="bankName"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor=""
            className="capitalize font-medium text-slate-600 text-7"
          >
            account number
          </label>
          <input
            type="text"
            className="px-2 border border-slate-300 py-2 rounded-md"
            autoComplete="off"
            onChange={validation.handleChange}
            value={validation.values.account}
            name="account"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor=""
            className="capitalize font-medium text-slate-600 text-7"
          >
            routing number
          </label>
          <input
            type="text"
            className="px-2 border border-slate-300 py-2 rounded-md"
            autoComplete="off"
            onChange={validation.handleChange}
            value={validation.values.routing}
            name="routing"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 px-6 rounded-md"
          >
            {addExternalLoad ? "Wait..." : "Submit"}
          </button>
          <button
            className="w-full bg-red-900 text-white py-2 px-6 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>

      {error && <Errortoast error={error} onClose={() => setError("")} />}
      {addExternalSuccess && (
        <Successttoast
          success={"External account added"}
          onClose={() => dispatch(resetAddExternal())}
        />
      )}
    </div>
  );
};

export default AddExternalModal;
