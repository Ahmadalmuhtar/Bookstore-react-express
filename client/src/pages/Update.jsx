import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/books/${id}`, book);
      navigate("/books"); // Redirect to the books page after updating
    } catch (error) {
      console.error("Error updating the book", error);
    }
  };

  console.log(book);

  return (
    <div>
      <div className="form">
        <h1>
          Update The Book
          <input
            type="text"
            placeholder="title"
            onChange={handleChange}
            name="title"
            value={book.title}
          />
          <input
            type="text"
            placeholder="desc"
            onChange={handleChange}
            name="desc"
            value={book.desc}
          />
          <input
            type="number"
            placeholder="price"
            onChange={handleChange}
            name="price"
            value={book.price || ""}
          />
          <input
            type="text"
            placeholder="cover"
            onChange={handleChange}
            name="cover"
            value={book.cover}
          />
          <button onClick={handleClick}>Update</button>
        </h1>
      </div>
    </div>
  );
};

export default Update;
