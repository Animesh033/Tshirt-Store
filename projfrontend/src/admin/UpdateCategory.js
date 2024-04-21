import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  // getCategories,
  getCategory,
  updateCategory,
} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    loading: false,
    error: "",
    createdCategory: "",
    getaRedirect: false,
    formData: "",
  });

  const { name, loading, error, createdCategory, formData } = values;

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // preloadCategories();
        setValues({
          ...values,
          name: data.name,
          formData: new FormData(),
        });
      }
    });
  };

  // const preloadCategories = () => {
  //   getCategories().then((data) => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setValues({
  //         categories: data,
  //         formData: new FormData(),
  //       });
  //     }
  //   });
  // };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateCategory(match.params.categoryId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          // preload(data._id);
          setValues({
            ...values,
            name: data.name,
            loading: false,
            createdCategory: data.name,
          });
        }
      }
    );
  };

  const handleChange = () => (event) => {
    let name = event.target.value;
    formData.set("name", name);
    setValues({ ...values, name });
  };

  const successMessage = () => (
    <div
      className="mt-3 alert alert-success"
      style={{ display: createdCategory ? "" : "none" }}
    >
      <h4>{createdCategory} updated successfully</h4>
    </div>
  );

  const createCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="my-3 form-control"
          onChange={handleChange()}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="upadte a category here!"
      description="Welcome to category update section"
      className="container p-4 bg-info"
    >
      <Link to="/admin/dashboard" className="mb-3 btn btn-md btn-dark">
        Admin Home
      </Link>
      <div className="text-white rounded row bg-dark">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
