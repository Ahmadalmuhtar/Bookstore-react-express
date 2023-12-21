import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate()
  const { id } = useParams()

const handleChange = (e) => {
  setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
}

const handleClick = async (e) => {
  e.preventDefault()
  try {
    await axios.put(`http://localhost:8080/books/${id}`, book)
    navigate('/')
  } catch (error) {
    console.error('Error Addin the book', error)
  }
}
console.log(book)

  return (
    <div>
      <div className="form">
        <h1>
          Update The Book
          <input type="text" placeholder="title" onChange={handleChange} name="title" />
          <input type="text" placeholder="desc" onChange={handleChange} name="desc" />
          <input type="number" placeholder="price" onChange={handleChange} name="price" />
          <input type="text" placeholder="cover" onChange={handleChange} name="cover" />
          <button onClick={handleClick}>Update</button>
        </h1>
      </div>
    </div>
  );
};

export default Update;
