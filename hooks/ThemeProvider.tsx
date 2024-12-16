import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

const lightTheme = {
  background: "#FFFFFF",
  text: "#000000",
  detailtitle: '#a16e00',
  datetime: '#480487',
  tabbackground: "#ff0000"
};

const darkTheme = {
  background: "#303030",
  text: "#FFFFFF",
  detailtitle: '#0ad6f5',
  datetime: '#fff700',
  tabbackground: "#9005ed"
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
