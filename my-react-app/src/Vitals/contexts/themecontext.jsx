import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState(() =>
    initialTheme || localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);

  console.log("🌐 Initialized theme:", theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};



export const useTheme = () => useContext(ThemeContext);
