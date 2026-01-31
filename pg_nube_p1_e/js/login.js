function login() {
  const usuario = document.getElementById("usuario").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!usuario || !password) {
    mensaje.innerText = "Por favor ingrese usuario y contraseña";
    return;
  }

  fetch("../pg_nube_p1_e/backend/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("usuario_id", data.usuario_id);
        window.location.href = "index.html";
      } else {
        mensaje.innerText = data.mensaje || "Credenciales incorrectas";
      }
    })
    .catch(() => {
      mensaje.innerText = "Ocurrió un error, intente de nuevo";
    });
}
