import React, { useState } from "react";

// auth context
import { useAuth } from "../context/authContext";

// icons
import {
  AiOutlineMenu as MenuIcon,
  AiOutlineQuestionCircle as HelpIcon,
} from "react-icons/ai";

import {
  RiSearchLine as SearchIcon,
  RiHome5Line as HomeIcon,
} from "react-icons/ri";
import {
  MdOutlineClear as ClearIcon,
  MdOutlineLibraryAdd as LibraryAddIcon,
} from "react-icons/md";
import {
  HiOutlinePlus as AddIcon,
  HiOutlineCog as SettingIcon,
  HiOutlineUsers as UsersIcon,
  HiOutlineLogout as LogoutIcon,
} from "react-icons/hi";
import {
  VscBell as BellIcon,
  VscSymbolColor as ThemeIcon,
} from "react-icons/vsc";
import {
  BiPieChart as ChartIcon,
  BiListCheck as MarkAsReadIcon,
} from "react-icons/bi";
import {
  AiOutlinePrinter as PrinterIcon,
  AiOutlineStar as StarIcon,
} from "react-icons/ai";
import { FaMobileAlt as MobileIcon } from "react-icons/fa";
import { FiActivity as ActivityIcon } from "react-icons/fi";

// react router dom
import { Link } from "react-router-dom";

import NotificationItem from "./NotificationItem";
import { notifications } from "../constants/notificatoins";
import ToggleThemeButton from "./ToggleThemeButton";

const Header = ({ openSidebar, setOpenSidebar }) => {
  const [searchInput, setSearchInput] = useState("");
  const [popups, setPopups] = useState({
    user: false,
    notification: false,
  });
  const { user, login, logout } = useAuth();
  return (
    <>
      <div className="fixed top-0 left-0 z-20 w-full bg-primary dark:bg-dark-200 text-white px-2 py-1">
        <div className=" mx-auto flex items-center justify-between gap-2 bg-transparent">
          {
            // TODO: add this later overflow-x-scroll sm:overscroll-x-none hide-scroll
          }
          <div className=" flex items-center gap-2">
            <button
              type="button"
              className="text-xl p-2 rounded transition-all hover:bg-white/20 text-white/80"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <MenuIcon />
            </button>
            <Link
              to="/"
              className="text-xl p-2 rounded transition-all hover:bg-white/20 text-white/70 "
            >
              <HomeIcon />
            </Link>
            <div className="flex">
              <div className="bg-white/30 dark:bg-white/10 py-1 px-2 flex items-center sm:gap-2 gap-1 rounded focus-within:bg-white focus-within:text-black transition-all">
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
              <span className="hidden text-sm sm:inline">2/5</span>
            </button>
            {/* <button
              type="button"
              className="text-2xl aspect-square block p-2 rounded transition-all hover:bg-white/20 text-white/80"
            >
              <HelpIcon />
            </button> */}
            <ToggleThemeButton />
            <div className="relative text-black/80 ">
              <button
                type="button"
                className="text-xl aspect-square block p-2 rounded transition-all hover:bg-white/20 text-white/80"
                onClick={() => {
                  setPopups({
                    user: false,
                    notification: !popups.notification,
                  });
                }}
              >
                <BellIcon />
              </button>

              {popups.notification && (
                <div className="absolute top-0 translate-x-10 sm:translate-x-0 translate-y-16 right-2 w-[350px] sm:w-[438px] rounded-lg bg-white z-10 border-2 shadow-md">
                  <div className="flex w-full items-center justify-between py-3 px-4">
                    <div className="bg-gray-100 p-1 rounded-full">
                      <button className="px-3 py-1 font-bold bg-white rounded-full">
                        Notification
                      </button>
                      <button className="px-3 py-1 font-bold bg-transparent text-black/50 rounded-full">
                        Unread
                      </button>
                    </div>
                    <button className="text-3xl aspect-square block p-2 rounded transition-all flex-shrink-0 text-black/50">
                      <MarkAsReadIcon />
                    </button>
                  </div>
                  <div className="flex w-full flex-col divide-y  h-[300px] overflow-y-scroll">
                    {notifications.map((notification, index) => (
                      <NotificationItem
                        key={index}
                        notification={notification}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative text-black/80 ">
              <button
                type="button"
                className="text-xl aspect-square block p-2 rounded transition-all flex-shrink-0 text-white/80"
                onClick={() => {
                  setPopups({
                    user: !popups.user,
                    notification: false,
                  });
                }}
              >
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="h-7 aspect-square rounded-full object-cover border border-black/20"
                />
              </button>
              {popups.user && (
                <div className="absolute top-0 translate-y-16 right-2 w-[274px] h-auto rounded-lg bg-white dark:bg-dark-200 dark:border-dark-200 z-10 border shadow-md">
                  <div className="p-2 border-b dark:border-white/20">
                    <div className="hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded-md">
                      <div className="flex gap-3 p-1 mb-1">
                        <img
                          src={user?.photoURL}
                          alt={user?.displayName}
                          className="rounded-full h-12 aspect-square block border border-black/70 dark:border-black/20"
                        />
                        <div>
                          <p className="dark:text-gray-200/80 text-black/80 font-bold">
                            {user?.displayName}
                          </p>
                          <p className="dark:text-gray-200/80 text-black/70 text-sm">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <div className="px-1 py-2">
                        <div className="flex item-center gap-2 dark:text-gray-200/80 text-black/60 ">
                          <SettingIcon className="text-xl dark:text-gray-200/80 text-black/40 " />
                          <div className="text-sm">Setting</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-1 py-2 border-b dark:border-white/20 flex flex-col gap-4">
                    <div className="flex item-center gap-2 dark:text-gray-200/80 text-black/60 hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded py-1 px-2">
                      <ThemeIcon className="text-xl dark:text-gray-200/80 text-black/40 " />
                      <div className="text-sm">Theme</div>
                    </div>
                    <div className="flex item-center gap-2 dark:text-gray-200/80 text-black/60 hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded py-1 px-2">
                      <ActivityIcon className="text-xl dark:text-gray-200/80 text-black/40 " />
                      <div className="text-sm">Activity Logs</div>
                    </div>
                    <div className="flex item-center gap-2 dark:text-gray-200/80 text-black/60 hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded py-1 px-2">
                      <PrinterIcon className="text-xl dark:text-gray-200/80 text-black/40 " />
                      <div className="text-sm">Print</div>
                    </div>
                    <div className="flex item-center gap-2 dark:text-gray-200/80 text-black/60 hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded py-1 px-2">
                      <LibraryAddIcon className="text-xl dark:text-gray-200/80 text-black/40 " />
                      <div className="text-sm">Integration</div>
                    </div>
                  </div>
                  <div className="px-1 py-2 border-b dark:border-white/20 flex flex-col gap-4">
                    <div className="flex item-center gap-2 dark:text-gray-200/80 text-black/60 hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded py-1 px-2">
                      <StarIcon className="text-xl text-yellow-500 " />
                      <div className="text-sm">Upgrade to Pro</div>
                    </div>
                    <div className="flex item-center gap-2 dark:text-gray-200/80 text-black/60 hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded py-1 px-2">
                      <UsersIcon className="text-xl text-violet-700 " />
                      <div className="text-sm">Upgrade to Business</div>
                    </div>
                    <div className="flex item-center gap-2 dark:text-gray-200/80 text-black/60 hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded py-1 px-2">
                      <MobileIcon className="text-xl dark:text-gray-200/80 text-black/40 " />
                      <div className="text-sm">Download Apps</div>
                    </div>
                  </div>
                  <button
                    className="px-4 py-3 flex w-full item-center gap-2 dark:text-gray-200/80 text-black/60 hover:bg-gray-100 dark:hover:bg-gray-100/10 rounded "
                    onClick={logout}
                  >
                    <LogoutIcon className="text-xl dark:text-gray-200/80 text-black/40 " />
                    <div className="text-sm">Logout</div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {(popups.user || popups.notification) && (
        <div
          className="backdrop-blur h-screen w-screen fixed top-0 left-0 bg-black/20 dark:bg-black/50 z-10 cursor-pointer"
          onClick={() =>
            setPopups({
              user: false,
              notification: false,
            })
          }
        />
      )}
    </>
  );
};

export default Header;
