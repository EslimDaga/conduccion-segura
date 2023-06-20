import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, accessBy }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (accessBy === "non-authenticated") {
    if (!user) {
      return children
    }
  }
  else if (accessBy === "authenticated") {
    if (user) {
      return children
    }
  }

  return <Navigate to="/" />
};

export default ProtectedRoute;