import React from "react";

// components
import { NotificationListItemIcon } from "./Icons";

// icons
import { BsCircle as CircleIcon } from "react-icons/bs";

const NotificationItem = ({ notification }) => {
  return (
    <div className="flex items-center w-full justify-betweens gap-3 py-6 px-4">
      <div className="text-primary flex flex-col justify-start h-full">
        <NotificationListItemIcon height={40} width={40} />
      </div>
      <div className="w-full">
        <p className="text-sm font-medium">{notification.text}</p>
        <p className="text-xs font-normal">{notification.time}</p>
      </div>
      <div className="flex h-full flex-col justify-end">
        <CircleIcon />
      </div>
    </div>
  );
};
export default NotificationItem;
