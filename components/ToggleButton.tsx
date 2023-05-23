"use client";

import { useState } from "react";

function SwitchButton() {
  const [isOn, setIsOn] = useState(Number(localStorage.getItem("isDark")));

  const handleClick = () => {
    setIsOn((val) => {
      if (val === 0) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return val === 1 ? 0 : 1;
    });
  };

  return (
    <div
      className={`w-12 h-7 flex items-center cursor-pointer rounded-2xl ${
        isOn ? "bg-sky-600" : "bg-gray-500"
      } ${isOn ? "justify-end" : "justify-start"} p-1`}
      onClick={handleClick}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

export default SwitchButton;
