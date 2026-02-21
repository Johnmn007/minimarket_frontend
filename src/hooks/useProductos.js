// // src/hooks/useProductos.js
// import { useState, useEffect } from 'react';
// import { fetchWithAuth } from '../api/api';

// export function useProductos() {
//   const [productos, setProductos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Listar productos
//   const listarProductos = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await fetchWithAuth('/productos');
//       setProductos(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Crear producto
//   const crearProducto = async (producto) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await fetchWithAuth('/productos', {
//         method: 'POST',
//         body: JSON.stringify(producto),
//       });
//       // Opcional: actualizar la lista local
//       setProductos(prev => [...prev, data]);
//       return data;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Cargar productos al montar el hook
//   useEffect(() => {
//     listarProductos();
//   }, []);

//   return {
//     productos,
//     loading,
//     error,
//     listarProductos,
//     crearProducto,
//   };
// }




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
      
      // Actualizar la lista local
      setProductos(prev => [...prev, data]);
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Obtener producto por ID
  const getProductoById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/productos/${id}`);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const actualizarProducto = async (id, producto) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth(`/productos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(producto),
      });
      
      // Actualizar la lista local
      setProductos(prev => prev.map(p => p.id === id ? data : p));
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await fetchWithAuth(`/productos/${id}`, {
        method: 'DELETE',
      });
      
      // Actualizar la lista local
      setProductos(prev => prev.filter(p => p.id !== id));
      
      return true;
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
    getProductoById,
    actualizarProducto,
    eliminarProducto,
  };
}