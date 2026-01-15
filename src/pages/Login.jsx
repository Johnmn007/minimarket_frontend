import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getToken } from "../api/api";
import logo from "../assets/Login.png";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (getToken()) {
    navigate("/", { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    try {
      await loginUser(username, password);
      setMensaje("✅ Login exitoso");
      navigate("/", { replace: true });
    } catch (error) {
      setMensaje("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100vw", backgroundColor: "#eaeaea" }}
    >
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: 400, width: "90%" }}>
        <div className="logo text-center mb-4">
          <img src={logo} alt="MiniMarket" className="img-fluid" />
          {/* <h2 className="text-success mt-3">grupo2</h2> */}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-4 mt-4"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button 
          className="btn btn-success w-100" 
          style={{ width: "50%", display: "block", margin: "0 auto" }}
          disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          {mensaje && (
            <div id="mensaje" className="alert alert-info text-center">
              {mensaje}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
