import client from "./client";

const profile = () => client.get("/auth/users/me/");
const editProfile = (profileInfo) => client.put("/auth/users/me/", profileInfo);

export default {
  profile,
  editProfile,
};
