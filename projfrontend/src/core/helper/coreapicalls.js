import { API } from "../../backend";

export const getProducts = () => {
  const getProductsURL = `${API}/products`;
  return fetch(getProductsURL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
