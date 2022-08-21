import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";
import Moon from "../Svg/moon";

function Navbar() {
  const [theme, setTheme] = useContext(ThemeContext);
  const isLight = theme === "light";
  return (
    <header>
      <div className="container ">
        <h2>Where in the world?</h2>
        <button
          onClick={() => {
            isLight ? setTheme("dark") : setTheme("light");
          }}
        >
          <Moon className="moon" fill={isLight ? "#000" : "#fff"} /> Dark Mode
        </button>
      </div>
    </header>
  );
}

export default Navbar;
