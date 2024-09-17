// Modal.js
import React from "react";
import { motion } from "framer-motion";

const RollingCircle = () => {
  return (
    <motion.div
      className="w-12 h-12 border-4 border-t-transparent border-blue-500 border-solid rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

const Modal = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center">
          <RollingCircle />
          <p className="mt-4 text-gray-700">Logging in...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
