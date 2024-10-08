import React from "react";
import { bg2 } from "../assets";

const Hero = () => {
  return (
    <div className="relative">
      <img src={bg2} alt="" className="w-full h-[400px] bg-contain bg-center" />
      <div className="absolute w-full top-0 left-0 bg-black h-full bg-opacity-60 text-white">
        <div className="p-6 flex flex-col gap-4 lg:max-w-[1100px] mx-auto">
          <h3 className="text-xl md:text-4xl capitalize">
            keep banking simple.
          </h3>
          <p className="font-thin text-sm lg:text-lg w-full sm:w-[60%]">
            Nobody likes complications. That's why we offer easy-to-understand
            account option, individual services, and a full set of features to
            help you handle your finances and take care of business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
