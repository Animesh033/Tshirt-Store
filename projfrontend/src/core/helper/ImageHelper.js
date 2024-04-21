import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className="p-2 border rounded border-success">
      <img
        src={imageurl}
        alt={product.name}
        style={{ maxHeight: "9rem", maxWidth: "4rem" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
