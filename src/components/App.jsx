import React, { useState } from "react";

// libraries
import { Route, Routes } from "react-router-dom";

// components
import Sidebar from "./Sidebar";
import Header from "./Header";

// framer motion
import { motion } from "framer-motion";

// pages
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { useAuth } from "../context/authContext";
import Login from "../pages/Login";
import BuildWthLove from "./BuildWthLove";

const App = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useAuth();
  return (
    <div className="bg-white dark:bg-dark-500 dark:text-white min-h-screen">
      {user && (
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      )}
      <motion.div className="flex gap-2 mx-auto w-full ">
        {openSidebar && <Sidebar />}
        <motion.main layout className={user && "w-full mt-14  pb-10"}>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/task/:taskID" element={user ? <Home /> : <Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </motion.div>
      <BuildWthLove />
    </div>
  );
};

export default App;
