// src/api/api.js

const API_URL = "http://localhost:8080/api";

/**
 * Login de usuario
 * Guarda el token JWT en localStorage
 */
export async function loginUser(username, password) {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",

    // 🔴 CLAVE: NO usar cookies (JWT va en headers)
    credentials: "omit",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Usuario o contraseña incorrectos");
  }

  // Guardar token
  localStorage.setItem("token", data.token);
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













// // src/api/api.js
// const API_URL = "http://localhost:8080/api";

// /**
//  * Realiza login de usuario.
//  * Guarda el token JWT en localStorage si es exitoso.
//  *
//  * @param {string} username
//  * @param {string} password
//  * @returns {Promise<object>} data del login { token, username, roles... }
//  */
// export async function loginUser(username, password) {
//   try {
//     const response = await fetch(`${API_URL}/auth/signin`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Usuario o contraseña inválidos");
//     }

//     const data = await response.json();

//     // Guardar token en localStorage
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//     }

//     return data;
//   } catch (error) {
//     console.error("Error en login:", error);
//     throw error;
//   }
// }

// /**
//  * Devuelve el token JWT almacenado en localStorage
//  * @returns {string|null}
//  */
// export function getToken() {
//   return localStorage.getItem("token");
// }

// /**
//  * Elimina el token JWT de localStorage (logout)
//  */
// export function logoutUser() {
//   localStorage.removeItem("token");
// }

// /**
//  * Helper para hacer peticiones protegidas a la API.
//  *
//  * @param {string} endpoint - endpoint relativo, por ejemplo '/products'
//  * @param {object} options - opciones adicionales para fetch
//  * @returns {Promise<object>} respuesta de la API
//  */
// export async function fetchWithAuth(endpoint, options = {}) {
//   const token = getToken();

//   if (!token) {
//     throw new Error("Token no encontrado. Debes iniciar sesión.");
//   }

//   const response = await fetch(`${API_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//       ...(options.headers || {}),
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || "Error en la petición autenticada");
//   }

//   return response.json();
// }

// export default API_URL;
