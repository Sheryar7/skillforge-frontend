import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  // If user already logged in → go to dashboard
  if (token !== null) {
    return <Navigate to="/dashboard" />;
  }

  // If not logged in → allow page
  return children;
};

export default OpenRoute;
