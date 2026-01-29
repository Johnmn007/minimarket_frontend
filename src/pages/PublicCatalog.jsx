import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useFiltradoProductos } from "../hooks/useFiltradoProductos";

const categorias = [
  "Todos",
  "Lácteos",
  "Panadería",
  "Abarrotes",
  "Cereales",
  "Frutas",
  "Verduras",
  "Bebidas",
  "Snacks",
  "Limpieza",
  "Carnes",
];

export default function PublicCatalog() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const { carrito, agregarProducto, disminuirProducto, eliminarProducto, limpiarCarrito, total } = useCart();

  // Usamos el hook de filtrado
  const { productosFiltrados, categoriaSeleccionada, setCategoriaSeleccionada } = useFiltradoProductos(productos);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <div className="container py-4">
      {/* NAVBAR */}
      <nav className="navbar navbar-light shadow-sm rounded mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-success">MiniMarket</span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-success">Usuario</span>
            <button className="btn bg-success text-white position-relative">
              Carrito
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {carrito.length}
              </span>
            </button>
            
          </div>
        </div>
      </nav>

      <div className="row">
        {/* COLUMNA PRODUCTOS */}
        <div className="col-lg-8">
          {/* Botones de categoría */}
          <div className="mb-3">
            {categorias.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm me-2 mb-2 ${
                  categoriaSeleccionada === cat ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setCategoriaSeleccionada(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Productos Disponibles</h3>
            <Link to="/product-register" className="btn btn-success btn-sm">
              Registrar Producto
            </Link>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} onAdd={agregarProducto} />
              ))
            ) : (
              <div className="alert alert-info w-100 text-center">
                No hay productos disponibles en esta categoría.
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA CARRITO */}
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">🛒 Mi Carrito</h5>
            </div>

            <div className="card-body">
              {carrito.length === 0 ? (
                <p className="text-muted text-center">El carrito está vacío</p>
              ) : (
                carrito.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                    <div className="d-flex align-items-center">
                      <img src={`/img/${item.imagen}`} alt={item.nombre} width={40} className="me-2" />
                      <div>
                        <strong>{item.nombre}</strong>
                        <br />
                        <small>S/ {item.precio.toFixed(2)} c/u</small>
                        <br />
                        <div className="col-12">
                          <button
                            className="btn btn-sm btn-outline-secondary me-1"
                            onClick={() => disminuirProducto(item.id)}
                            disabled={item.cantidad === 1}
                          >
                            -
                          </button>
                          <span>{item.cantidad}</span>
                          <button className="btn btn-sm btn-outline-secondary ms-1" onClick={() => agregarProducto(item)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-success fw-bold">S/ {(item.precio * item.cantidad).toFixed(2)}</div>

                    <button className="btn btn-danger btn-sm ms-3" onClick={() => eliminarProducto(item.id)}>
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="card-footer">
              <div className="d-flex justify-content-between mb-2">
                <strong>Total:</strong>
                <strong className="text-success">S/ {total.toFixed(2)}</strong>
              </div>

              <button className="btn btn-success w-100 mb-3" disabled={carrito.length === 0} onClick={() => navigate("/ticket")}>
                Finalizar Compra
              </button>

              <button className="btn btn-outline-danger w-100" disabled={carrito.length === 0} onClick={limpiarCarrito}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
