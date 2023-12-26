import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

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
      navigate('/');
    } catch (error) {
      console.error('Error updating the book', error);
    }
  };

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
            value={book.cover || ""}
          />
          <button onClick={handleSubmit}>Update</button>
        </h1>
      </div>
    </div>
  );
};

export default Update;