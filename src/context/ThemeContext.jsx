import React, { useContext, useEffect, useState } from "react";

const ThemeContext = React.createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setDarkMode(!isDark);
  };
  const value = { isDark, toggleDarkMode };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
