
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import "./ThemeToggle.css";
import { createPortal } from "react-dom";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("gammasoft-theme");
  return savedTheme === "light" ? "light" : "dark";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchTarget, setSwitchTarget] = useState(null);

  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("gammasoft-theme", theme);

    window.dispatchEvent(
      new CustomEvent("gammasoft-theme-change", {
        detail: { theme },
      })
    );
  }, [theme]);

  // Keep desktop and mobile toggles synchronized
  useEffect(() => {
    const syncTheme = (event) => {
      if (event.detail?.theme) {
        setTheme(event.detail.theme);
      }
    };

    window.addEventListener("gammasoft-theme-change", syncTheme);

    return () => {
      window.removeEventListener("gammasoft-theme-change", syncTheme);
    };
  }, []);

  const handleThemeSwitch = () => {
    if (isSwitching) return;

    const targetTheme = nextTheme;

    setSwitchTarget(targetTheme);
    setIsSwitching(true);

    // Change theme while the loader is visible
    setTimeout(() => {
      setTheme(targetTheme);
    }, 550);

    // Automatically close loader
    setTimeout(() => {
      setIsSwitching(false);
      setSwitchTarget(null);
    }, 1200);
  };

  return (
    <>
      <button
        type="button"
        className={`theme-switch ${theme}`}
        onClick={handleThemeSwitch}
        disabled={isSwitching}
        aria-label={`Switch to ${nextTheme} theme`}
      >
        <span className="theme-switch-track">
          <span className="theme-switch-thumb">
            {theme === "dark" ? (
              <Moon size={15} />
            ) : (
              <Sun size={15} />
            )}
          </span>
        </span>

        <span className="theme-switch-label">
          {theme === "dark" ? "Dark" : "Light"}
        </span>
      </button>

      {/* Automatic Theme Switching Loader */}
     {isSwitching &&
  createPortal(
    <div className="theme-loader-backdrop">
      <div className="theme-loader-modal">
        <div className={`theme-loader-icon ${switchTarget}`}>
          {switchTarget === "light" ? (
            <Sun size={30} />
          ) : (
            <Moon size={30} />
          )}
        </div>

        <h2>
          Switching to{" "}
          {switchTarget === "light" ? "Light" : "Dark"} Mode
        </h2>

        <p>Preparing your GammaSoft experience...</p>

        <div className="theme-loader">
          <span></span>
        </div>

        <div className="theme-loader-status">
          <span className="theme-loader-dot"></span>
          Applying appearance settings
        </div>
      </div>
    </div>,
    document.body
  )}
    </>
  );
};

export default ThemeToggle;
