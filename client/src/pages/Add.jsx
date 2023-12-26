import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [newBook, setNewBook] = useState({
    title: "",
    desc: "",
    price: "",
    cover: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/books/create", book);
      navigate("/");
    } catch (error) {
      console.error("Error Addin the book", error);
    }
  };
  console.log(book);

  return (
    <div>
      <div className="form">
        <h1>
          Add New Book
          <input
            type="text"
            placeholder="title"
            onChange={handleChange}
            name="title"
          />
          <input
            type="text"
            placeholder="desc"
            onChange={handleChange}
            name="desc"
          />
          <input
            type="number"
            placeholder="price"
            onChange={handleChange}
            name="price"
          />
          <input
            type="file"
            accept="image/jpeg"
            placeholder="cover"
            onChange={handleChange}
            name="cover"
          />
          <button onClick={handleClick}>Add</button>
        </h1>
      </div>
    </div>
  );
};

export default Add;
