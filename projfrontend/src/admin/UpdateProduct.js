import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import {
  getCategories,
  getProduct,
  // getProductPhoto,
  updateProduct,
} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    // loading,
    // error,
    createdProduct,
    // getaRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();

        setValues((prevValues) => ({
          ...prevValues,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data?.category?._id,
          stock: data.stock,
          photo: getImageUrl(data.photo),
          formData: new FormData(),
        }));
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          categories: data,
          formData: new FormData(),
        }));
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const getImageUrl = (imageBuffer) => {
    let imageStr = Buffer.from(imageBuffer.data, "binary").toString("base64");
    return `data:${imageBuffer.contentType};base64,${imageStr}`;
  };

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues((prevValues) => ({
            ...prevValues,
            name: data.name,
            description: data.description,
            price: data.price,
            photo: getImageUrl(data.photo),
            stock: data.stock,
            loading: false,
            createdProduct: data.name,
          }));
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="mt-3 alert alert-success"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} updated successfully</h4>
    </div>
  );

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <img src={photo} alt="product" srcSet="" width="100px" />
      </div>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          value={category}
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="mb-3 btn btn-outline-success"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container p-4 bg-info"
    >
      <Link to="/admin/dashboard" className="mb-3 btn btn-md btn-dark">
        Admin Home
      </Link>
      <div className="text-white rounded row bg-dark">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
