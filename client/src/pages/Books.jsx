import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/books");
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting this Book", error);
    }
  };

  return (
    <>
      <h1>Ahmad's Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <Link to={`/update/${book.id}`}>
              <button className="update">Update</button>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/add">
        <button style={{ cursor: "pointer" }}>Add new book</button>
      </Link>
    </>
  );
};

export default Books;
