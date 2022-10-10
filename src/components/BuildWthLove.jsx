import React from "react";

// icon
import { BsFillSuitHeartFill as HeartIcon } from "react-icons/bs";

const BuildWthLove = () => {
  return (
    <div className="fixed flex items-center group gap-1 text-sm bottom-2 right-2 bg-dark-200 text-white py-2 px-4 rounded-md ">
      Made with <HeartIcon className="text-red-600 duration-75" title="Love" />{" "}
      by
      <a
        href="https://sahil-verma.vercel.app/"
        target="_blank"
        className="font-medium group-hover:text-red-500 transition-all"
      >
        Sahil Verma.
      </a>
    </div>
  );
};

export default BuildWthLove;
