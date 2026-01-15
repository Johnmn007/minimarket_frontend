export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.roles[0];

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido <strong>{user.username}</strong></p>

      <hr />

      {role === "ADMIN" && (
        <ul>
          <li>👥 Gestión de usuarios</li>
          <li>📦 Productos</li>
          <li>📊 Inventario</li>
          <li>🧾 Ventas</li>
          <li>📈 Reportes</li>
        </ul>
      )}

      {role === "CAJERO" && (
        <ul>
          <li>🧾 Registrar venta</li>
          <li>📜 Historial de ventas</li>
        </ul>
      )}

      {role === "ALMACENERO" && (
        <ul>
          <li>📦 Gestión de productos</li>
          <li>📊 Inventario</li>
          <li>⚠️ Alertas de stock</li>
        </ul>
      )}
    </div>
  );
}
