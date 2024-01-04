import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../ThemeProvider";

const Update = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const containerStyle = {
    background: theme.background,
    color: theme.text,
    padding: "20px",
  };

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/books/${id}`, book);
      navigate("/");
    } catch (error) {
      console.error("Error updating the book", error);
    }
  };

  return (
    <div style={containerStyle}>
      <div className="form">
        <h1>Update The Book</h1>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={book.title || ""}
          onChange={handleChange}
        />
        {/* ... Other input fields ... */}
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default Update;
