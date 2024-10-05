import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const baseClasses =
    "fixed top-4 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg flex items-center justify-between max-w-sm w-full overflow-hidden z-50";
  const gradientClasses = {
    info: "bg-gradient-to-r from-blue-400 to-purple-400",
    success: "bg-gradient-to-r from-green-400 to-blue-400",
    error: "bg-gradient-to-r from-red-400 to-pink-400",
    warning: "bg-gradient-to-r from-yellow-400 to-orange-400",
  };

  return (
    <div className={`${baseClasses} ${gradientClasses[type]} p-[2px]`}>
      <div className="bg-white bg-opacity-90 rounded-full p-3 flex items-center justify-between w-full">
        <span className="text-gray-800 font-medium flex-grow text-center">
          {message}
        </span>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="ml-4 text-gray-600 hover:text-gray-800 transition"
        >
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
