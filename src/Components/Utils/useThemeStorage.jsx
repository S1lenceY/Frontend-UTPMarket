import { useEffect, useState } from "react";

//Lógica para los temas de modo Oscuro y Claro

const useThemeStorage = () => {
  const getThemeFromLocalStorage = () => {
    return localStorage.getItem("theme") || "light";
  };

  const setThemeToLocalStorage = (theme) => {
    localStorage.setItem("theme", theme);
  };

  const [theme, setTheme] = useState(getThemeFromLocalStorage);

  useEffect(() => {
    const applyThemeToDocument = () => {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    };

    applyThemeToDocument();
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeToLocalStorage(newTheme);
  };

  return { theme, toggleTheme };
};

export default useThemeStorage;
