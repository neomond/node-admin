import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import "./Details.css";

const Details = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { productId } = useParams();

  useEffect(() => {
    axios(`http://localhost:3200/api/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.response.data));
  }, [productId]);

  if (error !== "") {
    return <h1>{error}</h1>;
  }
  if (!product) return null;

  return (
    <div className="product-details">
      <div className="head">
        <Link to="/">
          <h4> Product Details</h4>
        </Link>
        <Link className="details-icons" to={`/edit/${product.id}`}>
          <div>
            <BiEditAlt
              style={{ width: "28px", height: "28px", color: "#222222" }}
            />
          </div>
          <span
            style={{
              fontSize: "21px",
              paddingLeft: "0.2rem",
              color: "#222222",
            }}
          >
            edit
          </span>
        </Link>
      </div>
      <div className="details-items-wrapper">
        <div className="details-items">
          <div className="details-img">
            <img src={`http://localhost:3200/${product.productImage}`} alt="" />
          </div>
          <h2>{product.name}</h2>
          <h3>Price: {product.price} ₽</h3>
          <p>{product.details}</p>
          <p>Featured: {String(product.featured)}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
