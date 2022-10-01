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

const App = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <div>
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <motion.div className="flex gap-2 mx-auto">
        {openSidebar && <Sidebar />}
        <motion.main layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </motion.main>
      </motion.div>
    </div>
  );
};

export default App;
