import { useState, useEffect } from "react";
import "./Create.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "./Edit.css";

const Create = () => {
  const history = useHistory();
  const { productId } = useParams();

  const [state, setState] = useState({
    name: "",
    details: "",
    price: 0,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [productImage, setProductImage] = useState(null);

  const handleProductImage = (e) => {
    const image = e.target.files[0];

    if (image) {
      setProductImage(image);
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
    }
  };

  const handlChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, details, price } = state;
    const data = new FormData();

    data.append("name", name);
    data.append("details", details);
    data.append("price", Number(price));
    data.append("featured", featured);
    data.append("productImage", productImage);

    axios
      .put(`http://localhost:3200/api/products/${productId}`, data)
      .then((res) => history.push(`/products/${productId}`))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios(`http://localhost:3200/api/products/${productId}`)
      .then((res) => {
        setState({
          name: res.data.name,
          details: res.data.details,
          price: res.data.price,
        });
        setFeatured(res.data.featured);
        setPreviewImage(`http://localhost:3200/${res.data.productImage}`);
      })
      .catch((err) => console(err));
  }, [productId]);

  return (
    <div className="form-container">
      <h1>Edit Product</h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={state.name}
            onChange={handlChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="details">Product Details</label>
          <textarea
            name="details"
            id="details"
            value={state.details}
            onChange={handlChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={state.price}
            onChange={handlChange}
          />
        </div>
        <div className="form-control form-control-featured">
          <label htmlFor="featured">Featured</label>
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
        </div>

        <div className="form-control-edit">
          <label htmlFor="productImage">Select image</label>
          {previewImage && (
            <div>
              <img className="preview-image" src={previewImage} alt="preview" />
            </div>
          )}
          <input
            type="file"
            name="productImage"
            id="productImage"
            accept="image/png, image/jpeg"
            onChange={handleProductImage}
          />
        </div>
        <button className="create-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
