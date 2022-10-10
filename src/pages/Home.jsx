import React, { useEffect, useRef, useState } from "react";
// import Header from "../components/Header";

// framer motion
import { motion, Reorder } from "framer-motion";

// icons
import { HiOutlineAdjustments as AdjustIcon } from "react-icons/hi";
import { NoTaskIcon } from "../components/Icons";
import { HiOutlinePlus as AddIcon } from "react-icons/hi";
import { FiInbox as InboxIcon } from "react-icons/fi";
import { ImPriceTag as TagIcon } from "react-icons/im";
import {
  IoFlagOutline as FlagIcon,
  IoAlarmOutline as ClockIcon,
} from "react-icons/io5";
import { BsCalendarEvent as Calendar1Icon } from "react-icons/bs";
import { ImSpinner8 as SpinnerIcon } from "react-icons/im";

// components
import TaskBar from "../components/TaskBar";

// auth context
import { useAuth } from "../context/authContext";

// firebase
import { addTaskToDB, getTasksFromDB } from "../firebase";
import { TaskbarSkeleton } from "../components/Skeleton";
import { useParams } from "react-router-dom";
import Task from "../components/Task";
import { variants } from "../constants/variants";

const Home = () => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    task: "",
    description: "",
  });

  const { taskID } = useParams();

  const addTask = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const task = await addTaskToDB(user?.uid, formData);
    setTasks([...tasks, task]);
    setFormData({
      task: "",
      description: "",
    });
    setFormLoading(false);
  };

  const getData = async () => {
    setIsLoading(true);
    const data = await getTasksFromDB(user?.uid);
    setTasks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <motion.div
        layout
        className="md:py-8 md:px-10 px-3 w-full xl:max-w-5xl mx-auto"
      >
        {/* <Header /> */}
        <div className="flex items-center justify-between w-full gap-2 static top-0 left-0">
          <div className="flex items-center gap-2">
            <span className="block text-xl font-bold">Today</span>
            <span className="block text-sm text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                weekday: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <button
            type="button"
            className="text-xl aspect-square block p-2 rounded transition-all hover:bg-black/10 text-black/30 dark:text-gray-400"
          >
            <AdjustIcon />
          </button>
        </div>

        {/* tasks list */}
        <Reorder.Group
          as="ul"
          values={tasks}
          axis="y"
          onReorder={setTasks}
          dragElastic={0.8}
          variants={variants.container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
          // layout
        >
          {tasks.length > 0 ? (
            tasks.map((task, i) => (
              <TaskBar
                key={task.id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))
          ) : (
            <>{isLoading && <TaskbarSkeleton count={10} />}</>
          )}
        </Reorder.Group>
        {showTaskInput ? (
          <form onSubmit={addTask}>
            <div className="flex flex-col gap-2 border dark:border-dark-100 rounded-lg p-3">
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
                className="text-sm outline-none h-auto focus:h-[200px] dark:border-dark-100 focus:border focus:rounded focus:p-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 bg-transparent"
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
                    className="flex items-center gap-2 text-green-500 border dark:border-dark-100 rounded-md py-1 px-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-100"
                  >
                    <Calendar1Icon className="text-base" />
                    Today
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2  text-blue-500 border dark:border-dark-100 rounded-md py-1 px-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-100"
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
                  setShowTaskInput(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary py-2 px-4 text-sm font-bold text-white/90 dark:text-gray-300 rounded hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!formData.task || formLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <SpinnerIcon className="animate-spin" />
                    <span>Loading...</span>
                  </span>
                ) : (
                  "Add task"
                )}
              </button>
            </div>
          </form>
        ) : (
          <>
            {!isLoading && (
              <button
                type="button"
                className="flex gap-2 py-2 my-2 items-center group w-full"
                onClick={() => {
                  console.log(showTaskInput);
                  setShowTaskInput(true);
                }}
              >
                <span
                  className="text-primary transition-all group-hover:rounded-full group-hover:bg-primary group-hover:text-white p-1"
                  aria-hidden="true"
                >
                  <AddIcon />
                </span>
                <span className="group-hover:text-primary dark:text-gray-400">
                  Add task
                </span>
              </button>
            )}
          </>
        )}
        {tasks.length <= 0 && !isLoading && (
          <>
            {!showTaskInput && (
              <div className="flex items-center flex-col gap-2">
                <NoTaskIcon className="text-primary w-full max-w-[208px] mx-auto object-cover" />
                <p>Enjoy your day off</p>
              </div>
            )}
          </>
        )}
      </motion.div>
      {taskID && (
        <Task
          userID={user?.uid}
          taskID={taskID}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
    </>
  );
};

export default Home;
