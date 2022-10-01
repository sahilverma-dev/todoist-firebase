import React from "react";
import { TodoistLongIcon } from "./Icons";

import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      className="bg-primary w-screen h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center flex-col">
        <motion.img
          src="https://beta.techcrunch.com/wp-content/uploads/2015/09/todoist-new-logo-red.png"
          alt="todoist logo"
          className="h-48 "
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          loading="lazy"
        />
        <div className="loader relative h-1.5 w-60 rounded-full overflow-hidden bg-white">
          <div
            className="absolute top-0 left-0 h-full bg-gray-900 rounded-full animate"
            style={{
              width: "80%",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loading;
