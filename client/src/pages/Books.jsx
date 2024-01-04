import React from "react";
import { useTheme } from "../ThemeProvider";
import { Link } from "react-router-dom";

const Books = () => {
  const { theme, toggleTheme } = useTheme();

  const containerStyle = {
    background: theme.background,
    color: theme.text,
    padding: "20px",
  };

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div style={containerStyle}>
      <h1>Ahmad's Book Shop</h1>
      <button onClick={handleToggle}>Toggle Theme</button>
      <Link to="/add">
        <button style={{ cursor: "pointer" }}>Add new book</button>
      </Link>
    </div>
  );
};

export default Books;
