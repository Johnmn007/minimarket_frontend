import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";

export default function ProductRegister() {
  const navigate = useNavigate();
  const { crearProducto } = useProductos();

  const handleAddProduct = async (producto) => {
    await crearProducto(producto);
    // No hay alert ni redirección automática
  };

  return (
    <div className="container py-4">
      
      <ProductForm
        onAddProduct={handleAddProduct}
        onExit={() => navigate("/")} // botón para ir al catálogo si quiere
      />
    </div>
  );
}
