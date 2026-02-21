// src/pages/ProductRegister.jsx
import React, { useState } from 'react';
import { useProductos } from '../hooks/useProductos';

const ProductRegister = () => {
  const { productos, loading, error, crearProducto } = useProductos();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearProducto(formData);
      alert('Producto creado exitosamente');
      setFormData({ nombre: '', descripcion: '', precio: '', categoria: '', imagen: '' });
    } catch (err) {
      alert('Error al crear producto: ' + err.message);
    }
  };

  if (loading && productos.length === 0) {
    return <div className="text-center mt-5">Cargando productos...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Registro de Productos</h2>

      {/* Formulario */}
      <div className="card mb-4">
        <div className="card-header">Nuevo Producto</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="categoria"
                  placeholder="Categoría"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="precio"
                  placeholder="Precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="imagen"
                  placeholder="URL de imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 mb-3">
                <textarea
                  className="form-control"
                  name="descripcion"
                  placeholder="Descripción"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="2"
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Guardar Producto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Lista de productos */}
      <h3>Productos Existentes</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {productos.map(prod => (
          <div key={prod.id} className="col-md-4 mb-3">
            <div className="card">
              {prod.imagen && (
                <img 
                  src={prod.imagen} 
                  className="card-img-top" 
                  alt={prod.nombre} 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">{prod.descripcion}</p>
                <p className="card-text"><strong>S/ {prod.precio}</strong></p>
                <p className="card-text"><small className="text-muted">{prod.categoria}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRegister;