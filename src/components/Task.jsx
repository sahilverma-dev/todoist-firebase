import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// icons
import { FiInbox as InboxIcon } from "react-icons/fi";
import {
  HiChevronUp as UpIcon,
  HiChevronDown as DownIcon,
} from "react-icons/hi";
import {
  BiDotsHorizontalRounded as MenuIcon,
  BiRefresh as RefreshIcon,
} from "react-icons/bi";
import {
  MdOutlineClear as CloseIcon,
  MdDone as DoneIcon,
  MdOutlineSort as DescriptionIcon,
} from "react-icons/md";
import { HiOutlinePencil as EditIcon } from "react-icons/hi";
import {
  BsCircle as CircleIcon,
  BsCalendarEvent as Calendar1Icon,
} from "react-icons/bs";
import {
  IoFlagOutline as FlagIcon,
  IoAlarmOutline as ClockIcon,
} from "react-icons/io5";
import {
  ImPriceTag as TagIcon,
  ImSpinner2 as SpinnerIcon,
} from "react-icons/im";
import { AiOutlinePlus as AddIcon } from "react-icons/ai";

// firebase
import {
  addSubTaskToDB,
  getSingleTask,
  getSubTaskFromDB,
  updateTask,
} from "../firebase";
import { TaskbarSkeleton } from "./Skeleton";
import TaskBar from "./TaskBar";
import SubTaskBar from "./SubTaskBar";
import { Reorder } from "framer-motion";
import { variants } from "../constants/variants";

const Task = ({ userID, taskID, tasks, setTasks }) => {
  const [task, setTask] = useState(null);
  const [edit, setEdit] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [subTaskFormData, setSubTaskFormData] = useState({
    task: "",
    description: "",
  });
  const [formData, setFormData] = useState({
    task: "",
    description: "",
  });
  const addSubTask = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const newSubtask = await addSubTaskToDB(userID, taskID, subTaskFormData);
    console.log(newSubtask);
    setSubTasks([...subTasks, newSubtask]);
    setSubTaskFormData({
      task: "",
      description: "",
    });
    setShowInput(false);
    setFormLoading(false);
  };

  const getSubTasks = async () => {
    const tasks = await getSubTaskFromDB(userID, taskID);
    setSubTasks(tasks);
  };

  const editTask = async (e) => {
    setFormLoading(true);
    try {
      e.preventDefault();
      await updateTask(userID, taskID, formData);
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
      setTask({
        task: formData.task,
        description: formData.description,
      });
      setEdit(false);
      setFormLoading(false);
    } catch (error) {
      setTask(null);
      console.log(error);
      setFormLoading(false);
    }
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getSingleTask(userID, taskID);
      setFormData({
        task: data.task,
        description: data.description,
      });
      setTask(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
    getSubTasks();
  }, []);
  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-50 pt-10 sm:p-10">
      <div
        className="backdrop-blur h-full w-full absolute top-0 left-0 bg-black/50 z-10 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className="h-full w-full max-w-5xl overflow-y-scroll mx-auto bg-white dark:bg-dark-400 overflow-hidden relative rounded-xl shadow-lg z-50">
        <div className="flex w-full static top-0 left-0 z-20 items-center justify-between  border-b dark:border-dark-100 bg-white dark:bg-dark-500  px-4 py-1">
          <div className="flex-grow">
            <div className="flex items-center text-sm gap-2">
              <InboxIcon className="text-base text-blue-500 " />
              Inbox
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="aspect-square block p-2 rounded transition-all hover:bg-black/10 text-black/50 dark:text-white/80 disabled:opacity-50"
              disabled
            >
              <UpIcon className="text-3xl" />
            </button>
            <button
              type="button"
              className="aspect-square block p-2 rounded transition-all hover:bg-black/10 text-black/50 dark:text-white/80 disabled:opacity-50"
              disabled
            >
              <DownIcon className="text-3xl" />
            </button>
            <button
              type="button"
              className="aspect-square block p-2 rounded transition-all hover:bg-black/10 text-black/50 dark:text-white/80 disabled:opacity-50"
            >
              <MenuIcon className="text-3xl" />
            </button>
            <button
              type="button"
              className="aspect-square block p-2 rounded transition-all hover:bg-black/10 text-black/50 dark:text-white/80 disabled:opacity-50"
              onClick={() => navigate(-1)}
            >
              <CloseIcon className="text-2xl" />
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <SpinnerIcon className="text-primary animate-spin text-4xl" />
          </div>
        ) : (
          <>
            {task ? (
              <div className="p-5">
                {edit ? (
                  <form onSubmit={editTask}>
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
                          setEdit(false);
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
                          "Edit Task"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex gap-4 group">
                    <button className="text-lg pt-2 text-black/50 dark:text-white/50 h-full flex flex-col items-center">
                      <CircleIcon />
                    </button>
                    <div className="h-full flex-grow">
                      <div className="text-2xl font-bold">{task?.task}</div>
                      <div className="py-3 flex items-center gap-2 text-black/70  dark:text-white/50">
                        <DescriptionIcon />
                        <p className="font-light">{task?.description}</p>
                      </div>
                    </div>
                    <button
                      className="text-lg pt-2 text-black/50 hover:text-primary dark:text-white/50 h-full flex flex-col items-center"
                      onClick={() => setEdit(true)}
                    >
                      <EditIcon />
                    </button>
                  </div>
                )}
                <h2>Sub Tasks</h2>
                {/* tasks list */}
                <Reorder.Group
                  as="ul"
                  values={subTasks}
                  axis="y"
                  onReorder={setSubTasks}
                  dragElastic={0.8}
                  variants={variants.container}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col "
                >
                  {subTasks.length > 0 ? (
                    subTasks.map((task, i) => (
                      <SubTaskBar
                        key={task.id}
                        task={task}
                        tasks={subTasks}
                        setTasks={setSubTasks}
                      />
                    ))
                  ) : (
                    <>{isLoading && <TaskbarSkeleton count={10} />}</>
                  )}
                </Reorder.Group>
                {showInput ? (
                  <form onSubmit={addSubTask} className="mt-3">
                    <div className="flex flex-col gap-2 border dark:border-white/20 rounded-lg p-3 ml-7">
                      <input
                        type="text"
                        className="text-base font-medium outline-none disabled:cursor-not-allowed disabled:opacity-40 bg-transparent"
                        placeholder="Task Name"
                        value={subTaskFormData.task}
                        disabled={formLoading}
                        autoFocus
                        onChange={({ target }) =>
                          setSubTaskFormData({
                            ...subTaskFormData,
                            task: target.value,
                          })
                        }
                      />
                      <textarea
                        placeholder="Description"
                        className="text-sm outline-none h-auto focus:h-[200px] focus:border dark:border-white/20  focus:rounded focus:p-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 bg-transparent"
                        disabled={formLoading}
                        value={subTaskFormData.description}
                        onChange={({ target }) =>
                          setSubTaskFormData({
                            ...subTaskFormData,
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
                          setShowInput(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-primary py-2 px-4 text-sm font-bold text-white/90 rounded hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={!subTaskFormData.task || formLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <SpinnerIcon className="animate-spin" />
                            <span>Loading...</span>
                          </span>
                        ) : (
                          "Edit Task"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-2 ml-5">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm p-2 rounded transition-all hover:bg-black/10 text-black/80   dark:hover:bg-dark-100 dark:text-white/50"
                      onClick={() => setShowInput(true)}
                    >
                      <AddIcon className="text-sm font-medium" />
                      Add sub-task
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <div className="flex flex-col gap-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
                    alt=""
                    className="h-52"
                  />
                  <h2 className="text-center w-full font-medium text-xl">
                    Unable To Find this task.
                  </h2>
                  <button
                    className="px-4 py-2 rounded-full bg-primary hover:bg-red-600 text-white font-medium"
                    onClick={() => window.location.reload()}
                  >
                    Refresh This Page
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
