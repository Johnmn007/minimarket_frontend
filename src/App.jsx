import { Routes, Route, Navigate } from "react-router-dom";

// Páginas públicas
import PublicCatalog from "./pages/PublicCatalog";
import Ticket from "./pages/Ticket";

// Admin
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductRegister from "./pages/ProductRegister";
import UserRegister from "./pages/UserRegister";

// Rutas protegidas
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      {/* 🌍 APP PÚBLICA */}
      <Route path="/" element={<PublicCatalog />} />
      <Route path="/ticket" element={<Ticket />} />

      {/* 🔐 LOGIN ADMIN (no visible, acceso manual) */}
      <Route path="/admin/login" element={<Login />} />

      {/* 🔐 ÁREA ADMIN PROTEGIDA */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="ProductRegister" element={<ProductRegister />} />
        <Route path="UserRegister" element={<UserRegister />} />
        {/* futuras rutas admin aquí */}
      </Route>

      {/* ❌ CATCH ALL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
