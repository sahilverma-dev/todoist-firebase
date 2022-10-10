import React, { useEffect, useState } from "react";

// icons
import { FiSun as SunIcon, FiMoon as MoonIcon } from "react-icons/fi";

const ToggleThemeButton = () => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      setTheme("light");
      document.querySelector("body").classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      document.querySelector("body").classList.add("dark");
    }
  };

  useEffect(() => {
    const themeFromLS = localStorage.getItem("theme");
    setTheme(themeFromLS === "dark" ? "dark" : "light");
    if (themeFromLS === "dark")
      document.querySelector("body").classList.add("dark");
  }, []);
  return (
    <button
      type="button"
      className="text-xl aspect-square block p-2 rounded transition-all hover:bg-white/20 text-white/80 outline-none"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ToggleThemeButton;
