/* eslint-disable react/prop-types */
import React from "react";

const Accountaccess = ({ currentBal }) => {
  // Define the phase limits
  const firstPhaseMax = 63000;
  const secondPhaseMax = 110000;
  const totalMax = secondPhaseMax;

  const paid = totalMax - currentBal;

  // Calculate the progress percentage
  let progress = 0;

  if (currentBal) {
    progress = (paid / secondPhaseMax) * 100;
  }

  // Calculate the position of the first phase max (63k)
  const firstPhasePosition = (firstPhaseMax / secondPhaseMax) * 100;

  return (
    <div className="flex flex-col">
      <div>
        <h3>Current progress:</h3>
        {/* Progress Bar */}
        <div
          className="flex justify-between text-xs mt-1 "
          style={{ position: "relative" }}
        >
          <span>Initial</span>
          <span style={{ left: `57%`, position: "absolute" }}>First phase</span>
          <span>Complete</span>
        </div>
        <div className="w-full h-5 border border-slate-300 rounded-xl relative">
          {/* Main progress bar */}
          <div
            className={`h-full rounded-xl ${
              progress <= 50 ? "bg-blue-500" : "bg-green-500"
            }`}
            style={{ width: `${progress}%` }}
          />
          {/* Red indicator at 63k */}
          <div
            className="absolute top-0 h-full w-[4px] bg-red-500 border border-yellow-400"
            style={{ left: `${firstPhasePosition}%` }}
          />
        </div>
        <div
          className="flex justify-between text-xs mt-1 "
          style={{ position: "relative" }}
        >
          <span>$0</span>
          <span
            style={{ left: `57%`, position: "absolute" }}
          >{`$${firstPhaseMax.toLocaleString()}`}</span>
          <span>${totalMax.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Accountaccess;
