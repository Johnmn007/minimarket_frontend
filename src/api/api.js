// src/api/api.js

const API_URL = "http://localhost:8080/api";

/**
 * Login de usuario
 * Guarda el token JWT en localStorage
 */
export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Usuario o contraseña incorrectos");
  }

  // Guardar token
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data));

  return data;
}

/**
 * Obtiene el token JWT
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Logout
 */
export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

/**
 * Fetch con JWT para endpoints protegidos
 */
export async function fetchWithAuth(endpoint, options = {}) {
  const token = getToken();

  if (!token) {
    throw new Error("No hay token. Debes iniciar sesión.");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    // 🔴 CLAVE: JWT solo en headers
    credentials: "omit",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en petición autenticada");
  }

  return data;
}

export default API_URL;









