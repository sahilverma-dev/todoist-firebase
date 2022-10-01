import React, { useState } from "react";

// auth context
import { useAuth } from "../context/authContext";

// icons
import {
  AiOutlineMenu as MenuIcon,
  AiOutlineQuestionCircle as HelpIcon,
} from "react-icons/ai";
import { GrHomeRounded as HomeIcon } from "react-icons/gr";
import { RiSearchLine as SearchIcon } from "react-icons/ri";
import { MdOutlineClear as ClearIcon } from "react-icons/md";
import { HiOutlinePlus as AddIcon } from "react-icons/hi";
import { BiPieChart as ChartIcon } from "react-icons/bi";
import { VscBell as BellIcon } from "react-icons/vsc";

// react router dom
import { Link } from "react-router-dom";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const { user, login, logout } = useAuth();
  return (
    <div className="w-full bg-primary text-white px-2 py-1">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 bg-transparent overflow-x-scroll sm:overscroll-x-none hide-scroll">
        <div className=" flex items-center gap-2">
          <button
            type="button"
            className="text-xl p-2 rounded transition-all hover:bg-white/20 text-white/80"
          >
            <MenuIcon />
          </button>
          <Link
            to="/"
            className="text-lg p-1 rounded transition-all invert opacity-70 hover:bg-white/20 text-white/80"
          >
            <HomeIcon color="white" children="asfsdf" />
          </Link>
          <div className="flex">
            <div className="bg-white/30 py-1 px-2 flex items-center sm:gap-2 gap-1 rounded focus-within:bg-white focus-within:text-black transition-all">
              <label htmlFor="search-input" className="cursor-pointer">
                <SearchIcon className="text-sm sm:text-2xl" />
              </label>
              <input
                type="text"
                className="h-5 text-sm bg-transparent placeholder:text-white w-[40px] focus:w-[150px] sm:w-[150px] sm:focus:w-[300px] focus:text-black transition-all text-white outline-none"
                id="search-input"
                placeholder="Search"
                onChange={({ target }) => setSearchInput(target.value)}
                value={searchInput}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    console.log("fuck off");
                  }}
                >
                  <ClearIcon />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center sm:gap-2">
          <button
            type="button"
            className="text-xl aspect-square block p-2 rounded transition-all hover:bg-white/20 text-white/80"
          >
            <AddIcon />
          </button>
          <button
            type="button"
            className="text-base p-2 rounded transition-all hover:bg-white/20 text-white/80 flex items-center gap-1"
          >
            <ChartIcon className="text-2xl" />
            <span className="hidden sm:inline">2/5</span>
          </button>
          <button
            type="button"
            className="text-2xl aspect-square block p-2 rounded transition-all hover:bg-white/20 text-white/80"
          >
            <HelpIcon />
          </button>
          <button
            type="button"
            className="text-xl aspect-square block p-2 rounded transition-all hover:bg-white/20 text-white/80"
          >
            <BellIcon />
          </button>
          <button
            type="button"
            className="text-xl aspect-square block p-2 rounded transition-all flex-shrink-0 hover:bg-white/20 text-white/80"
            // onClick={user ? logout : login}
          >
            <img
              src={user?.photoURL}
              alt=""
              className="h-7 aspect-square rounded-full object-cover border border-black/20"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
