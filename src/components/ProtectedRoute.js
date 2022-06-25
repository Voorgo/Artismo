import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (user?.email) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
