function login() {
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    if (usuario === "admin" && password === "1234") {
        mensaje.style.color = "green";
        mensaje.innerHTML = "✔ Login correcto. Bienvenido al MiniMarket";
    } else {
        mensaje.style.color = "red";
        mensaje.innerHTML = "✖ Usuario o contraseña incorrectos";
    }
}
