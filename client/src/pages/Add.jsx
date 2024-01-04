import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

const Add = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const containerStyle = {
    background: theme.background,
    color: theme.text,
    padding: "20px",
  };

  return (
    <div style={containerStyle}>
      <div className="form">
        <h1>Add a New Book</h1>
        {/* Your form input elements go here */}
        {/* Example input: */}
        <input type="text" placeholder="title" name="title" />
        {/* ... Other input fields ... */}
        <button onClick={() => navigate("/books")}>Add Book</button>
      </div>
    </div>
  );
};

export default Add;
