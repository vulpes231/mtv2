import React from "react";

const Accountaccess = () => {
  const currentBal = 64000; // example current balance

  // Define the phase limits
  const firstPhaseMax = 63000;
  const secondPhaseMax = 110000;
  const totalMax = secondPhaseMax;

  // Calculate the progress percentage
  let progress = 0;

  if (currentBal) {
    progress = secondPhaseMax - currentBal;
    console.log(progress);
  }

  return (
    <div className="flex flex-col">
      <small>
        First phase of <span>AAB (Account Access Boost)</span> is $63,000.00 and
        it gives you access to less than One Million USD.
      </small>
      <small>
        Second phase of <span>AAB (Account Access Boost)</span> is $110,000.00
        and it gives you access to the complete balance in your checking
        account.
      </small>

      <div>
        <small>Current progress</small>
        {/* Progress Bar */}
        <div className="w-full h-5 bg-red-200 ">
          <div
            className={`h-3 ${
              progress <= 100 ? "bg-blue-500" : "bg-green-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>$0</span>
          <span>{`$${currentBal.toLocaleString()}`}</span>
          <span>${totalMax.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Accountaccess;
