import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PublicCatalog from "./pages/PublicCatalog";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      {/* Catálogo público */}
      <Route path="/catalogo" element={<PublicCatalog />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
