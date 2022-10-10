import React, { useState } from "react";

// framer motion
import { Reorder, useDragControls } from "framer-motion";

// icons
import { MdDragIndicator as DragIcon } from "react-icons/md";
import { HiOutlinePencil as EditIcon } from "react-icons/hi";
import { BiDotsHorizontalRounded as MenuIcon } from "react-icons/bi";
import { FiInbox as InboxIcon } from "react-icons/fi";
import { BsCircle as CircleIcon } from "react-icons/bs";
import { MdDone as DoneIcon } from "react-icons/md";
import { ImSpinner8 as SpinnerIcon } from "react-icons/im";
import {
  IoFlagOutline as FlagIcon,
  IoAlarmOutline as ClockIcon,
} from "react-icons/io5";
import { ImPriceTag as TagIcon } from "react-icons/im";
import { BsCalendarEvent as Calendar1Icon } from "react-icons/bs";

import { removeTaskFromDB, updateTask } from "../firebase";
import { useAuth } from "../context/authContext";
import { variants } from "../constants/variants";
import { Link } from "react-router-dom";

const SubTaskBar = ({ task, tasks, setTasks }) => {
  const { user } = useAuth();
  const [showTick, setShowTick] = useState(false);
  const [formData, setFormData] = useState({
    task: task.task,
    description: task.description,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const completeTask = async () => {
    setShowTick(true);
    await removeTaskFromDB(user?.uid, task.id);
    setTasks(tasks?.filter((i) => i.id !== task.id));
  };

  const editTask = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    await updateTask(user?.uid, task.id, formData);
    setTasks(
      tasks.map((i) =>
        i.id === task.id
          ? {
              ...i,
              ...formData,
            }
          : i
      )
    );
    setEdit(false);
    setFormLoading(false);
  };

  const dragControls = useDragControls();

  return (
    <Reorder.Item
      as="li"
      value={task}
      variants={variants.items}
      id={task.id}
      dragListener={false}
      dragControls={dragControls}
      className="py-1 border-b w-full flex items-center gap-2 group bg-white dark:bg-dark-400 dark:border-dark-100"
    >
      {edit ? (
        <form onSubmit={editTask} className="w-full">
          <div className="flex flex-col gap-2 border dark:border-white/20 rounded-lg p-3">
            <input
              type="text"
              className="text-base font-medium outline-none disabled:cursor-not-allowed disabled:opacity-40 bg-transparent"
              placeholder="Task Name"
              value={formData.task}
              disabled={formLoading}
              autoFocus
              onChange={({ target }) =>
                setFormData({
                  ...formData,
                  task: target.value,
                })
              }
            />
            <textarea
              placeholder="Description"
              className="text-sm outline-none h-auto focus:h-[200px] focus:border dark:border-white/20  focus:rounded focus:p-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 bg-transparent"
              disabled={formLoading}
              value={formData.description}
              onChange={({ target }) =>
                setFormData({
                  ...formData,
                  description: target.value,
                })
              }
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 text-green-500 border dark:border-white/20 rounded-md py-1 px-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-100"
                >
                  <Calendar1Icon className="text-base" />
                  Today
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2  text-blue-500 border dark:border-white/20 rounded-md py-1 px-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-100"
                >
                  <InboxIcon className="text-base" />
                  Inbox
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="text-xl p-2 rounded transition-all hover:bg-black/10 dark:hover:bg-white/10 text-black/30 dark:text-white/20"
                >
                  <TagIcon />
                </button>
                <button
                  type="button"
                  className="text-2xl p-2 rounded transition-all hover:bg-black/10 dark:hover:bg-white/10 text-black/30 dark:text-white/20"
                >
                  <FlagIcon />
                </button>
                <button
                  type="button"
                  className="text-2xl p-2 rounded transition-all hover:bg-black/10 dark:hover:bg-white/10 text-black/30 dark:text-white/20"
                >
                  <ClockIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full p-2 items-center justify-end gap-2">
            <button
              type="button"
              className="bg-gray-100 dark:bg-dark-100 dark:text-white dark:hover:bg-white/20 py-2 px-4 text-sm font-bold text-black/70 rounded hover:bg-gray-200"
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary py-2 px-4 text-sm font-bold text-white/90 rounded hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!formData.task || formLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <SpinnerIcon className="animate-spin" />
                  <span>Loading...</span>
                </span>
              ) : (
                "Modify Task"
              )}
            </button>
          </div>
        </form>
      ) : (
        <>
          <button
            className="text-xl text-black/60 dark:text-white/50 md:opacity-0 group-hover:opacity-100 transition-all cursor-grab active:cursor-grabbing"
            onPointerDown={(event) => dragControls.start(event)}
          >
            <DragIcon />
          </button>
          <div className="flex items-center gap-2 flex-grow w-full">
            <button
              type="button"
              className="text-black/50 dark:text-white/40"
              onClick={completeTask}
            >
              {showTick ? (
                <span className="p-0.5 rounded-full border-2 text-green-500 border-green-500 block text-xs">
                  <DoneIcon />
                </span>
              ) : (
                <CircleIcon />
              )}
            </button>
            <Link to={`/task/${task?.id}`} className="flex-grow text-sm">
              {task?.task}
            </Link>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex">
              <button
                className=" md:opacity-0 group-hover:opacity-100 transition-all"
                onClick={() => setEdit(true)}
              >
                <EditIcon className="text-xl text-black/70 dark:text-white/50  border-b border-black/80 pb-1" />
              </button>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-black/60 dark:text-white/50 ">
                Index
              </span>
              <InboxIcon className="text-blue-500 text-xs" />
            </div>
          </div>
          <button className="text-2xl dark:text-white/50  text-black/70 h-full md:opacity-0 group-hover:opacity-100 transition-all">
            <MenuIcon />
          </button>
        </>
      )}
    </Reorder.Item>
  );
};

export default SubTaskBar;
