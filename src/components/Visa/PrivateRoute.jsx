import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  console.log(children);
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
