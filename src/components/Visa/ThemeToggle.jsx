import React, { useState, useEffect } from "react";
import { CiLight } from "react-icons/ci";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <button className="w-12 h-12 mx-5" onClick={handleToggle}>
        <CiLight className="">
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </CiLight>
      </button>
    </>
  );
};

export default ThemeToggle;
