import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";

const DynamicBackgroundCard = ({ name, onUpdate }) => {
  const [bgColor, setBgColor] = useState(name.bg || "bg-white");

  useEffect(() => {
    // Update the bgColor state when name.bg changes
    setBgColor(name.bg || "bg-white");
  }, [name.bg]);

  const getColorClass = (color) => {
    switch (color) {
      case "#27ff4f33":
        return "bg-[#27ff4f33]";
      case "#ff0c0c2e":
        return "bg-[#ff0c0c2e]";
      case "#ffffff":
      default:
        return "bg-white";
    }
  };

  const handleUpdate = (id, color) => {
    onUpdate(id, color);
    setBgColor(getColorClass(color));
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg group bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 p-[1px]">
      <div className="rounded-3xl bg-white">
        <div
          className={`markers rounded-3xl shadow-lg p-6 space-y-2 h-full relative ${getColorClass(
            bgColor
          )}`}
        >
          <div className="absolute top-2 right-2 cursor-pointer flex flex-row gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out p-1 rounded-full">
            <p
              className="text-green-500 hover:text-green-600 transition-colors"
              onClick={() => handleUpdate(name._id, "#27ff4f33")}
            >
              <IoMdCheckmark className="h-6 w-6" />
            </p>
            <p
              className="text-purple-500 hover:text-purple-600 transition-colors"
              onClick={() => handleUpdate(name._id, "#ffffff")}
            >
              <MdOutlineCircle className="h-5 w-5" />
            </p>
            <p
              className="text-red-500 hover:text-red-600 transition-colors"
              onClick={() => handleUpdate(name._id, "#ff0c0c2e")}
            >
              <RxCross2 className="h-5 w-5" />
            </p>
          </div>
          <p className="text-gray-700 font-medium">
            First Name: <span className="text-blue-500">{name.firstName}</span>
          </p>
          <p className="text-gray-700 font-medium">
            First Name Meaning:{" "}
            <span className="text-blue-500">{name.meaningOne}</span>
          </p>
          <p className="text-gray-700 font-medium">
            Second Name:{" "}
            <span className="text-pink-500">{name.secondName}</span>
          </p>
          <p className="text-gray-700 font-medium">
            Second Name Meaning:{" "}
            <span className="text-pink-500">{name.meaningTwo}</span>
          </p>{" "}
          <p className="text-gray-700 font-medium">
            User name:{" "}
            <span className="">{name.userName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicBackgroundCard;
