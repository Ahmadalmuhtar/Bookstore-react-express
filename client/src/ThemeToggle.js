import React from 'react';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const buttonStyle = {
        background: theme.buttonBackground,
        color: theme.buttonText,
    }

    return (
        <button style={buttonStyle} onClick={toggleTheme}>
            Toggle Theme
        </button>
    );
};

export default ThemeToggle;
