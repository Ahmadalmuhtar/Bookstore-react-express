import React, { useState } from "react";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  return (
    <div>
      <div className="form">
        <h1>
          Add New Book
          <input type="text" placeholder="title" />
          <input type="text" placeholder="desc" />
          <input type="number" placeholder="price" />
          <input type="text" placeholder="cover" />
        </h1>
      </div>
    </div>
  );
};

export default Add;
