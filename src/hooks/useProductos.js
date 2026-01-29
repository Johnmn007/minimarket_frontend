const API_URL = "http://localhost:8080/api/productos";

export function useProductos() {
  const crearProducto = async (producto) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (!response.ok) {
      throw new Error("Error al crear producto");
    }

    return await response.json();
  };

  return {
    crearProducto,
  };
}
