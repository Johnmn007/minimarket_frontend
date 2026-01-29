// src/pages/Ticket.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Ticket() {
  const { carrito, total } = useCart();
  const navigate = useNavigate();

  // Calculamos IGV y subtotal
  const igv = total * 0.18;
  const subtotal = total - igv;

  // Función para formatear moneda en PEN
  const formatCurrency = (num) =>
    num.toLocaleString("es-PE", { style: "currency", currency: "PEN" });

  // Fecha y hora formateadas
  const fecha = new Date();
  const fechaStr = fecha.toLocaleDateString("es-PE");
  const horaStr = fecha.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      className="ticket-container border p-4 mt-5"
      style={{
        maxWidth: 400,
        fontFamily: "Courier New, monospace",
        backgroundColor: "white",
      }}
    >
      {/* <div className="container-fluid  w-100 bg-success mb-2" style={{ height: "3em" }}></div> */}
      <div className="text-center mb-3">
        <h4 className="mb-0">🛒 MiniMarket</h4>
        <small>Av. Principal 123, Trujillo</small>
        <br />
        <small>RUC: 20123456789</small>
        <br />
        <small>Tel: (044) 123-456</small>
        <hr />
      </div>

      <div className="d-flex justify-content-between mb-2 small">
        <span>
          <strong>Boleta Nº:</strong> B001-1176
        </span>
        <span>
          <strong>Fecha:</strong> {fechaStr}
        </span>
      </div>
      <div className="d-flex justify-content-between mb-3 small">
        <span>
          <strong>Hora:</strong> {horaStr}
        </span>
        <span>
          <strong>Cajero:</strong> Administrador
        </span>
      </div>

      <div className="mb-3 small">
        <strong>Cliente:</strong> Administrador
        <br />
        admin@minimarket.com
      </div>

      <table className="table table-sm" style={{ fontSize: "0.85rem" }}>
        <thead>
          <tr>
            <th>Producto</th>
            <th className="text-center">Cant.</th>
            <th className="text-end">P.Unit</th>
            <th className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td className="text-center">{item.cantidad}</td>
              <td className="text-end">{formatCurrency(item.precio)}</td>
              <td className="text-end">{formatCurrency(item.precio * item.cantidad)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end small mb-2">
        <div>Subtotal: {formatCurrency(subtotal)}</div>
        <div>IGV (18%): {formatCurrency(igv)}</div>
        <hr />
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          TOTAL: <span className="text-success">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="text-center small text-muted mt-3">
        <div>
          Total de productos:{" "}
          {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
        </div>
        <div>¡Gracias por su compra! Vuelva pronto</div>
        <div className="mt-2">
          Esta es una representación electrónica de la boleta de venta
        </div>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-secondary btn-sm" onClick={() => navigate("/public-catalog")}>
          Cerrar
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={() => window.print()}
        >
          Imprimir
        </button>
      </div>
    </div>
  );
}
