import { useState, useEffect } from "react";

/**
 * Hook para filtrar productos por categoría.
 * @param {Array} productos - Lista completa de productos
 * @param {string} categoriaInicial - Categoría por defecto ("Todos")
 */
export function useFiltradoProductos(productos, categoriaInicial = "Todos") {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaInicial);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    if (categoriaSeleccionada === "Todos") {
      setProductosFiltrados(productos);
    } else {
      const filtrados = productos.filter((p) => p.categoria === categoriaSeleccionada);
      setProductosFiltrados(filtrados);
    }
  }, [productos, categoriaSeleccionada]);

  return { productosFiltrados, categoriaSeleccionada, setCategoriaSeleccionada };
}
