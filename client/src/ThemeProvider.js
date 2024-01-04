import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        buttonBackground: '#ffffff',
        buttonText: '#000000',
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => ({
            ...prevTheme,
            buttonBackground: prevTheme.buttonText,
            buttonText: prevTheme.buttonBackground,
        }));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;