import { useDarkMode } from "./../logic/DarkModeContext";
import SVG from "react-inlinesvg";
import Moon from "./../assets/icons/icon-moon.svg";
import Sun from "./../assets/icons/icon-sun.svg";

export default function ThemeToggle(props) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button className="darkModeBtn" onClick={toggleDarkMode} {...props}>
      {darkMode ? (
        <>
          <SVG className="menuIcon" src={Moon} />
        </>
      ) : (
        <>
          <SVG className="menuIcon" src={Sun} />
        </>
      )}
      <p className="favoriteMenuBtnTitle">{darkMode ? "Light" : "Dark"} mode</p>
    </button>
  );
}