import { createContext, useEffect, useState } from 'react';

export const ColorSchemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ColorSchemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState('');

  useEffect(() => {
    const detectColorScheme = () => {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setColorScheme(prefersDarkMode ? 'dark' : 'light');
    };

    // Detect initial color scheme
    detectColorScheme();

    // Add event listener for changes in color scheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      detectColorScheme();
    };
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <ColorSchemeContext.Provider value={colorScheme}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
