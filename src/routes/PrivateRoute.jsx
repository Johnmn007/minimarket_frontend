// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Si NO hay token → login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token → renderiza la vista protegida
  return children;
}

export default PrivateRoute;
