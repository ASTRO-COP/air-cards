import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

const lightTheme = {
  background: "#FFFFFF",
  text: "#000000",
};

const darkTheme = {
  background: "#000000",
  text: "#FFFFFF",
};

interface ThemeContextProps {
  theme: typeof lightTheme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  toggleTheme: () => {},
  isDarkMode: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from SecureStore when the app starts
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await SecureStore.getItemAsync('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    };
    loadTheme();
  }, []);

  // Toggle theme and save preference to SecureStore
  const toggleTheme = async () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);

    // Save the theme preference
    await SecureStore.setItemAsync('theme', newTheme);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
