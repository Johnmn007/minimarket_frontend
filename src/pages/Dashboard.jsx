



import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../api/api";
import "../assets/css/dashboard.css";

export default function Dashboard() {
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.roles[0];

  useEffect(() => {
    console.log("👤 Usuario logueado:", user);
    console.log("🔑 Roles del usuario:", user?.roles);
    cargarResumen();
  }, []);

  const cargarResumen = async () => {
    try {
      setLoading(true);
      const data = await fetchWithAuth("/dashboard/resumen");
      console.log("📊 Datos del dashboard:", data);
      setResumen(data);
      setError(null);
    } catch (err) {
      console.error("❌ Error al cargar dashboard:", err);

      if (err.message.includes("403") || err.message.includes("Forbidden")) {
        setError("No tienes permisos de administrador para ver este contenido");
      } else {
        setError(err.message);
      }

      // Datos de ejemplo para desarrollo (opcional)
      setResumen({
        ventasHoy: 1250.50,
        cantidadVentasHoy: 15,
        totalProductos: 245,
        productosConStock: 198,
        productosStockBajo: 32,
        productosAgotados: 15,
        usuariosActivos: 8,
        productosStockBajoList: [
          { id: 1, nombre: "Arroz", stock: 3, stockMinimo: 10, estado: "STOCK BAJO", categoria: "Abarrotes", precio: 3.50 },
          { id: 2, nombre: "Aceite", stock: 2, stockMinimo: 5, estado: "STOCK BAJO", categoria: "Abarrotes", precio: 8.90 },
          { id: 3, nombre: "Leche", stock: 0, stockMinimo: 8, estado: "AGOTADO", categoria: "Lácteos", precio: 2.30 },
          { id: 4, nombre: "Huevos", stock: 4, stockMinimo: 12, estado: "STOCK BAJO", categoria: "Frescos", precio: 9.50 },
          { id: 5, nombre: "Pan", stock: 0, stockMinimo: 10, estado: "AGOTADO", categoria: "Panadería", precio: 1.20 },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case "ADMIN": return "👑";
      case "CAJERO": return "💰";
      case "ALMACENERO": return "📦";
      default: return "👤";
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case "ADMIN": return "bg-primary";
      case "CAJERO": return "bg-success";
      case "ALMACENERO": return "bg-warning";
      default: return "bg-secondary";
    }
  };

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "AGOTADO":
        return <span className="badge bg-dark">🔥 AGOTADO</span>;
      case "STOCK BAJO":
        return <span className="badge bg-warning text-dark">⚠️ STOCK BAJO</span>;
      default:
        return <span className="badge bg-success">✓ NORMAL</span>;
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid px-4">
        {/* Header de bienvenida */}
        <div className={`row mb-4 ${getRoleColor()} text-white rounded-3 p-4 mt-3`}>
          <div className="col-12">
            <div className="d-flex align-items-center">
              <span className="display-1 me-3">{getRoleIcon()}</span>
              <div>
                <h1 className="display-6 mb-1">
                  ¡Bienvenido, {user?.username || "Usuario"}!
                </h1>
                <p className="lead mb-0">
                  Rol: <strong>{role}</strong> | {new Date().toLocaleDateString('es-PE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        {/* Cards de resumen para ADMIN */}
        {role === "ADMIN" && resumen && (
          <>
            {/* Ventas del día */}
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <div className="card bg-primary text-white h-100 shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-white-50 mb-2">Ventas Hoy</h6>
                        <h2 className="mb-0">S/ {resumen.ventasHoy?.toFixed(2) || "0.00"}</h2>
                      </div>
                      <i className="bi bi-cash-stack fs-1"></i>
                    </div>
                    <div className="mt-3">
                      <small className="text-white-50">
                        {resumen.cantidadVentasHoy || 0} transacciones
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="card bg-info text-white h-100 shadow">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-white-50 mb-2">Usuarios Activos</h6>
                        <h2 className="mb-0">{resumen.usuariosActivos || 0}</h2>
                      </div>
                      <i className="bi bi-people fs-1"></i>
                    </div>
                    <div className="mt-3">
                      <small className="text-white-50">
                        {resumen.nuevosUsuariosMes || 0} nuevos este mes
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas de productos */}
            <div className="row mb-4">
              <div className="col-md-3 mb-3">
                <div className="card bg-secondary text-white h-100 shadow">
                  <div className="card-body">
                    <h6 className="text-white-50">Total Productos</h6>
                    <h3 className="mb-0">{resumen.totalProductos || 0}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-success text-white h-100 shadow">
                  <div className="card-body">
                    <h6 className="text-white-50">Con Stock</h6>
                    <h3 className="mb-0">{resumen.productosConStock || 0}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-warning text-white h-100 shadow">
                  <div className="card-body">
                    <h6 className="text-white-50">Stock Bajo</h6>
                    <h3 className="mb-0">{resumen.productosStockBajo || 0}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card bg-danger text-white h-100 shadow">
                  <div className="card-body">
                    <h6 className="text-white-50">Agotados</h6>
                    <h3 className="mb-0">{resumen.productosAgotados || 0}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de productos con problemas */}
            {resumen.productosStockBajoList?.length > 0 && (
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card shadow">
                    <div className="card-header bg-warning text-white">
                      <h5 className="mb-0">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        Productos que requieren atención ({resumen.productosStockBajoList.length})
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>ID</th>
                              <th>Producto</th>
                              <th>Categoría</th>
                              <th>Precio</th>
                              <th>Stock</th>
                              <th>Stock Mínimo</th>
                              <th>Estado</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resumen.productosStockBajoList.map(prod => (
                              <tr key={prod.id}>
                                <td>#{prod.id}</td>
                                <td>
                                  <strong>{prod.nombre}</strong>
                                </td>
                                <td>{prod.categoria || "Sin categoría"}</td>
                                <td>S/ {prod.precio?.toFixed(2) || "0.00"}</td>
                                <td>
                                  <span className={`badge ${prod.estado === 'AGOTADO' ? 'bg-dark' :
                                      prod.estado === 'STOCK BAJO' ? 'bg-warning' : 'bg-success'
                                    }`}>
                                    {prod.stock}
                                  </span>
                                </td>
                                <td>{prod.stockMinimo}</td>
                                <td>{getEstadoBadge(prod.estado)}</td>
                                <td>
                                  <Link
                                    to={`/admin/ProductRegister?id=${prod.id}`}
                                    className="btn btn-sm btn-outline-primary me-2"
                                  >
                                    <i className="bi bi-pencil"></i> Editar
                                  </Link>
                                  <button
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => console.log("Reabastecer", prod.id)}
                                  >
                                    <i className="bi bi-plus-circle"></i> Reabastecer
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Acceso rápido para otros roles */}
        {role !== "ADMIN" && (
          <div className="row">
            <div className="col-12">
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                Vista simplificada para rol {role}. Próximamente más funcionalidades.
              </div>
            </div>
          </div>
        )}

        {/* Acceso rápido general */}
        <div className="row mt-4">
          <div className="col-12">
            <h4 className="border-bottom pb-2 mb-3">
              <i className="bi bi-rocket-takeoff me-2"></i>
              Acceso Rápido
            </h4>
          </div>
          <div className="col-md-3 mb-3">
            <Link to="/admin/ProductRegister" className="text-decoration-none">
              <div className="card text-center h-100 shadow-sm hover-card">
                <div className="card-body">
                  <i className="bi bi-box-seam fs-1 text-primary"></i>
                  <h6 className="mt-2">Registrar Producto</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3 mb-3">
            <Link to="/admin/UserRegister" className="text-decoration-none">
              <div className="card text-center h-100 shadow-sm hover-card">
                <div className="card-body">
                  <i className="bi bi-person-plus fs-1 text-success"></i>
                  <h6 className="mt-2">Registrar Usuario</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3 mb-3">
            <Link to="/" className="text-decoration-none">
              <div className="card text-center h-100 shadow-sm hover-card">
                <div className="card-body">
                  <i className="bi bi-shop fs-1 text-warning"></i>
                  <h6 className="mt-2">Tienda Pública</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-center h-100 shadow-sm hover-card">
              <div className="card-body">
                <i className="bi bi-printer fs-1 text-secondary"></i>
                <h6 className="mt-2">Reportes</h6>
                <small className="text-muted">Próximamente</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-card {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important;
        }
        .card {
          border-radius: 10px;
          overflow: hidden;
        }
        .bg-primary {
          background: linear-gradient(45deg, #4e73df, #224abe) !important;
        }
        .bg-success {
          background: linear-gradient(45deg, #1cc88a, #13855c) !important;
        }
        .bg-warning {
          background: linear-gradient(45deg, #f6c23e, #dda20a) !important;
        }
        .bg-info {
          background: linear-gradient(45deg, #36b9cc, #258391) !important;
        }
        .bg-danger {
          background: linear-gradient(45deg, #e74a3b, #be2617) !important;
        }
        .bg-secondary {
          background: linear-gradient(45deg, #858796, #60616f) !important;
        }
      `}</style>
    </>
  );
}