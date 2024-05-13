import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { motion } from "framer-motion";
import useThemeStorage from "./useThemeStorage";

const TOGGLE_CLASSES = "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-1.5 transition-colors relative z-10";

const ThemeButton = () => {
  const { theme, toggleTheme } = useThemeStorage();

  return (
    <div className="relative flex w-fit h-fit items-center rounded-full ">
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={toggleTheme}
      >
        <FiMoon className="relative z-10 text-sm" />
        <span className="relative z-10">Claro</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={toggleTheme}
      >
        <FiSun className="relative z-10 text-sm" />
        <span className="relative z-10">Noche</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default ThemeButton;
