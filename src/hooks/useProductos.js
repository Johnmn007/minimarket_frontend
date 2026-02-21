// src/hooks/useProductos.js
import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../api/api';

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Listar productos
  const listarProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth('/productos');
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear producto
  const crearProducto = async (producto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth('/productos', {
        method: 'POST',
        body: JSON.stringify(producto),
      });
      // Opcional: actualizar la lista local
      setProductos(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el hook
  useEffect(() => {
    listarProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    listarProductos,
    crearProducto,
  };
}