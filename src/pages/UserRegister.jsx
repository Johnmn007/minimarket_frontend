import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function UserRegister() {

    const navigate = useNavigate();

    // Estados de formulario
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Manejo de submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/signup",
                {
                    username,
                    password,
                    roles, // ["ADMIN"], ["VENDEDOR"], ["ALMACENERO"]
                }
            );

            setMessage(response.data.message);
            setUsername("");
            setPassword("");
            setRoles([]);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error al registrar usuario");
        } finally {
            setLoading(false);
        }
    };

    // Manejo de roles (checkboxes)
    const handleRoleChange = (e) => {
        const value = e.target.value;
        setRoles((prev) =>
            prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
        );
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">

            <div className="mt-4 card shadow-lg p-5 h-100 ">
                <h2 className="text-center text-success mb-3">Minimarket</h2>
                <h5  className="text-center text-success mb-4">Registro de Usuario</h5>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit} style={{ width: "18rem" }}>
                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label fw-bold">
                            Usuario
                        </label>
                        <input
                            type="text"
                            className="form-control bg-light border-0"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control bg-light border-0"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Roles */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Roles</label>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="admin"
                                value="ADMIN"
                                checked={roles.includes("ADMIN")}
                                onChange={handleRoleChange}
                            />
                            <label className="form-check-label" htmlFor="admin">
                                Admin
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="vendedor"
                                value="VENDEDOR"
                                checked={roles.includes("VENDEDOR")}
                                onChange={handleRoleChange}
                            />
                            <label className="form-check-label" htmlFor="vendedor">
                                Vendedor
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="almacenero"
                                value="ALMACENERO"
                                checked={roles.includes("ALMACENERO")}
                                onChange={handleRoleChange}
                            />
                            <label className="form-check-label" htmlFor="almacenero">
                                Almacenero
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn btn-success w-75 p-2 m-auto mt-4 d-block"
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary w-75 p-2 m-auto mt-4 d-block"
                        disabled={loading}
                        onClick={() => navigate("/login")}
                    >
                        Volver
                    </button>
                </form>
            </div>

        </div>
    );
}

export default UserRegister;
