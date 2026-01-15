import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <strong>🛒 Minimarket</strong>

      {user && (
        <span style={{ marginLeft: "1rem" }}>
          {user.username} ({user.roles[0]})
        </span>
      )}

      <button
        onClick={logout}
        style={{ float: "right" }}
      >
        Logout
      </button>
    </nav>
  );
}
