import React from "react";

// framer motion
import { motion } from "framer-motion";

// icons
import { FiInbox as InboxIcon } from "react-icons/fi";
import { FaBoxes as BoxesIcon } from "react-icons/fa";
import { HiOutlinePlus as AddIcon } from "react-icons/hi";

import {
  BsCalendarEvent as Calendar1Icon,
  BsCalendarMonth as Calendar2Icon,
  BsChevronRight as RightIcon,
} from "react-icons/bs";

const Sidebar = () => {
  return (
    <motion.div
      layout
      initial={{
        x: -100,
        opacity: 0.5,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: -100,
        opacity: 0.5,
      }}
      className="bg-gray-100 dark:bg-dark-300 p-3 w-[300px] min-h-screen group mt-14"
    >
      <div className="flex flex-col gap-2">
        <div className="rounded py-2 px-3 bg-gray-200 dark:bg-dark-100 flex items-center gap-2 justify-between w-full">
          <div className="flex items-center gap-2">
            <InboxIcon className="text-xl text-blue-500" />
            Inbox
          </div>
          {/* <span className="text-gray-500">7</span> */}
        </div>
        <div className="rounded py-2 px-3 hover:bg-gray-200 dark:hover:bg-dark-100 flex items-center gap-2 justify-between w-full transition-all">
          <div className="flex items-center gap-2">
            <Calendar1Icon className="text-green-500" />
            Today
          </div>
          {/* <span className="text-gray-500">7</span> */}
        </div>
        <div className="rounded py-2 px-3 hover:bg-gray-200 dark:hover:bg-dark-100 flex items-center gap-2 justify-between w-full transition-all">
          <div className="flex items-center gap-2">
            <Calendar2Icon className="text-purple-500" />
            Upcoming
          </div>
        </div>
        <div className="rounded py-2 px-3 hover:bg-gray-200 dark:hover:bg-dark-100 flex items-center gap-2 justify-between w-full transition-all">
          <div className="flex items-center gap-2">
            <BoxesIcon className=" text-yellow-500" />
            Filter & Labels
          </div>
        </div>
      </div>
      <div className="w-full p-3">
        <div className="flex items-center gap-2">
          <RightIcon />
          <span className="font-semibold">Favorite</span>
        </div>
      </div>
      <div className="w-full p-3">
        <div className="flex items-center gap-2">
          <RightIcon />
          <span className="font-semibold flex-grow">Projects</span>
          <button
            type="button"
            className="text-xl p-2 rounded transition-all opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto hover:bg-black/10 dark:text-white text-black/60"
          >
            <AddIcon />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
