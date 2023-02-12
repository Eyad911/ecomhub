import { useContext } from "react";
import AuthContext from "./context";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  return { user, setUser };
};
