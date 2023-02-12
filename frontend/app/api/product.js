import client from "./client";

const endpoint = "/store/products/";

const getProduct = () => client.get(endpoint);

const addProduct = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("unit_price", listing.price);
  data.append("description", listing.description);
  data.append("category", listing.category.value);
  data.append("inventory", listing.inventory);

  // listing.pic.forEach((pic, index) =>
  
  data.append("pic", {
    name: "image.jpg",
    type: "image/jpg",
    uri: listing.pic[0],
  });
  // );
  console.log(data, "+++++++++++++++++++++++++++++++++++");

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  //   const config = {
  //     onUploadProgress: progressEvent => console.log(progressEvent.loaded / progressEvent.total)
  // }

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

// Reviews
const postReviews = (id, commentInfo) =>
  client.post(`/store/products/${id}/reviews/`, commentInfo);
const deleteReviews = (id, rid) =>
  client.delete(`/store/products/${id}/reviews/${rid}`);
const getReviews = (id) => client.get(`/store/products/${id}/reviews`);
const getAllReviews = () => client.get(`/store/allreviews`);

export default {
  addProduct,
  getProduct,
  getReviews,
  getAllReviews,
  postReviews,
  deleteReviews,
};
