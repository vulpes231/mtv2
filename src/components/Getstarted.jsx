import React from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    id: 1,
    title: "checking & savings",
    info: "Checking and Savings that are quick, simple and intuitive",
    features: [
      "checking",
      "interest checking",
      "savings",
      "money market",
      "CD & IRAs",
    ],
  },
  {
    id: 2,
    title: "lending",
    info: "From purchasing a new car, to upgrading your home, you can get by with little help.",
    features: ["personal loans", "auto loans", "mortgage loans"],
  },
];

const Getstarted = () => {
  return (
    <div className="w-full p-6">
      <div className="lg:max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6 ">
        {steps.map((stp) => {
          return (
            <div key={stp.id} className="flex flex-col gap-4 p-6">
              <h3 className="text-xl lg:text-3xl font-medium capitalize">
                {stp.title}
              </h3>
              <p className="text-md md:text-lg font-thin">{stp.info}</p>
              <ul className="flex flex-col gap-4 list-disc pl-5  capitalize ">
                {stp.features.map((ft, index) => {
                  return (
                    <li className="text-sm md:text-md font-thin" key={index}>
                      {ft}
                    </li>
                  );
                })}
              </ul>
              <Link className="bg-blue-600 text-white w-full sm:w-[180px] border-none outline-none px-5 py-2.5 sm:text-center font-medium text-sm sm:text-md shadow-md shadow-blue-400">
                Learn more
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Getstarted;
