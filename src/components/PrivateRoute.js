import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check user login status

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
