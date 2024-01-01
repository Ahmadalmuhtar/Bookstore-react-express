import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const Add = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // For file inputs, use FileReader to read the file content
    if (type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setBook((prev) => ({ ...prev, [name]: reader.result }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      // For other inputs, update the state as usual
      setBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/books/create", book);
      navigate("/");
    } catch (error) {
      console.error("Error adding the book", error);
    }
  };

  return (
    <div>
      <div className="form">
        <h1 style={{ color: isDarkMode ? "black" : "white" }}>
          Add a New Book
          <input
            type="text"
            placeholder="title"
            onChange={handleChange}
            name="title"
            value={book.title || ""}
          />
          <input
            type="text"
            placeholder="desc"
            onChange={handleChange}
            name="desc"
            value={book.desc || ""}
          />
          <input
            type="number"
            placeholder="price"
            onChange={handleChange}
            name="price"
            value={book.price || ""}
          />
          <input
            type="file"
            accept="image/jpeg"
            placeholder="cover"
            onChange={handleChange}
            name="cover"
          />
          <button onClick={handleSubmit}>Add Book</button>
        </h1>
        <button onClick={toggleTheme}>
          Toggle Theme: {isDarkMode ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
};

export default Add;
