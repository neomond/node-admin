import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { BiEditAlt, BiHomeHeart } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Modal from "./Modal";

const Home = () => {
  const [products, setProducts] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3200/api/products/${id}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios("http://localhost:3200/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <div className="head">
        <h1>
          <div>
            <BiHomeHeart className="home-icons" />
          </div>
          <span>Home</span>- Products List
        </h1>
        <Link to="/create" className="home-container-create">
          Create new +
        </Link>
      </div>

      <table className="table">
        <tr>
          <th>Product Image</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Featured</th>
          <th>Actions</th>
        </tr>

        {products?.map((product) => (
          <tr key={product.id}>
            <td>
              <div className="product-img-container">
                <img
                  className="product-img"
                  src={` http://localhost:3200/${product.productImage}`}
                  alt={product.name}
                />
              </div>
            </td>
            <td>
              <Link to={`/products/${product.id}`}> {product.name} </Link>
            </td>
            <td className="home-price">{product.price} ₽</td>
            <td className="home-featured">{String(product.featured)}</td>
            <td className="home-actions-btn">
              <Link to={`/edit/${product.id}`}>
                <BiEditAlt className="btns home-edit-btn" />
              </Link>
              <button
                className="home-del-btn"
                onClick={() => handleDelete(product.id)}
                onMouseOver={({ target }) => (target.style.color = "#E1C4A9")}
                onMouseOut={({ target }) => (target.style.color = "black")}
              >
                <RiDeleteBin5Fill className="btns home-del-btn" />
              </button>
            </td>
          </tr>
        ))}
      </table>
      {/* <Modal /> */}
    </div>
  );
};

export default Home;
