import client from "./client";

const cart = () => client.post(`/store/carts/`);
const cartItem = (id, cartdetails) =>
  client.post(`/store/carts/${id}/items/`, cartdetails);
const getCart = (id) => client.get(`/store/carts/${id}`);
const quantityUpdate = (cartsid, id, update) =>
  client.patch(`/store/carts/${cartsid}/items/${id}/`, update);

const deleteProduct = (cartsid, id) =>
  client.delete(`/store/carts/${cartsid}/items/${id}/`);

export default {
  cart,
  cartItem,
  getCart,
  quantityUpdate,
  deleteProduct
};
