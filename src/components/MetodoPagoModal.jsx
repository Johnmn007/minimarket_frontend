import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { getMetodosPagoPublic, finalizarVenta } from '../api/api';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const MetodoPagoModal = ({ show, onClose }) => {
    const { carrito, total, limpiarCarrito } = useCart();
    const navigate = useNavigate();

    const [metodos, setMetodos] = useState([]);
    const [selectedMetodo, setSelectedMetodo] = useState(null);
    const [referencia, setReferencia] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (show) {
            setLoading(true);
            getMetodosPagoPublic()
                .then(data => {
                    const activos = data.filter(m => m.activo);
                    setMetodos(activos);
                    const efectivo = activos.find(m => m.nombre === 'EFECTIVO');
                    if (efectivo) setSelectedMetodo(efectivo);
                })
                .catch(() => setError('Error al cargar métodos de pago'))
                .finally(() => setLoading(false));
        }
    }, [show]);

    const handleConfirmar = async () => {
        if (!selectedMetodo) {
            setError('Selecciona un método de pago');
            return;
        }

        const requiereRef = selectedMetodo.nombre !== 'EFECTIVO';
        if (requiereRef && !referencia.trim()) {
            setError('Referencia obligatoria para YAPE o PLIN');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const items = carrito.map(item => ({
                productoId: item.id,
                cantidad: item.cantidad
            }));

            const response = await finalizarVenta({
                items,
                metodoPagoId: selectedMetodo.id,
                referencia: requiereRef ? referencia : ''
            });

            // Pasamos al ticket: el carrito original + la respuesta de la venta
            navigate('/ticket', {
                state: {
                    venta: response,
                    carrito: carrito,        // Para mostrar los detalles en el ticket
                    metodoPago: selectedMetodo.nombre,
                    total: total
                }
            });

            limpiarCarrito();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Seleccionar Método de Pago</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {loading && <div className="text-center">Cargando...</div>}
                        {error && <div className="alert alert-danger">{error}</div>}

                        {!loading && metodos.length > 0 && (
                            <>
                                <div className="mb-3">
                                    {metodos.map(metodo => (
                                        <div key={metodo.id} className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="metodoPago"
                                                id={`metodo-${metodo.id}`}
                                                value={metodo.id}
                                                checked={selectedMetodo?.id === metodo.id}
                                                onChange={() => setSelectedMetodo(metodo)}
                                            />
                                            <label className="form-check-label" htmlFor={`metodo-${metodo.id}`}>
                                                {metodo.nombre}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                {selectedMetodo && selectedMetodo.nombre !== 'EFECTIVO' && (
                                    <div className="mb-3">
                                        <label htmlFor="referencia" className="form-label">Referencia (opcional)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="referencia"
                                            value={referencia}
                                            onChange={(e) => setReferencia(e.target.value)}
                                            placeholder="Número de operación"
                                        />
                                        <div className="mt-3 text-center">
                                            <QRCodeCanvas
                                                value={`Pago ${selectedMetodo.nombre} - S/ ${total.toFixed(2)} - Ref: ${referencia || 'N/A'}`}
                                                size={180}
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                                level="L"
                                                includeMargin={false}
                                            />
                                            <p className="text-muted small mt-2">
                                                Escanea para pagar con {selectedMetodo.nombre}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between">
                                    <strong>Total a pagar:</strong>
                                    <strong className="text-success">S/ {total.toFixed(2)}</strong>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleConfirmar}
                            disabled={loading}
                        >
                            {loading ? 'Procesando...' : 'Confirmar Pago'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetodoPagoModal;