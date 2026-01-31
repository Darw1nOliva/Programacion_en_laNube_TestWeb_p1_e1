function login() {
  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!usuario || !password) {
    mensaje.innerText = "Por favor ingrese usuario y contraseña";
    return;
  }

  fetch("/backend/login.php", {
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
    .catch(err => {
      console.error("Error al conectar con el backend:", err);
      mensaje.innerText = "Ocurrió un error, intente de nuevo";
    });
}

// ---------------------- CHECK SESSION ----------------------
function checkSession() {
  const isLoginPage = window.location.pathname.includes("login.html");
  if (!localStorage.getItem("usuario_id") && !isLoginPage) {
    window.location.href = "login.html";
  }
}


function logout() {
  localStorage.removeItem("usuario_id");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  checkSession();

  const logoutLink = document.querySelector(".login-btn");
  if (logoutLink) {
    logoutLink.addEventListener("click", e => {
      e.preventDefault();
      logout();
    });
  }
});
