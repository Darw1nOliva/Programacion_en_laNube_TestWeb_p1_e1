<?php
session_start();
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode([
    "success" => false,
    "mensaje" => "Datos inválidos"
  ]);
  exit;
}

$usuario  = strtolower(trim($data["usuario"] ?? ""));
$password = trim($data["password"] ?? "");

$usuarios = [
  "darwin.oliva@gmail.com" => "MyClaseNube@2025",
  "maestro@gmail.com"     => "MyClaseNube@2025",
  "test@gmail.com"        => "MyClaseNube@2025"
];

if (isset($usuarios[$usuario]) && $usuarios[$usuario] === $password) {

  // Simulamos un ID
  $_SESSION["usuario_id"] = md5($usuario);

  echo json_encode([
    "success"    => true,
    "mensaje"    => "Login correcto",
    "usuario"    => $usuario,
    "usuario_id" => $_SESSION["usuario_id"]
  ]);
} else {
  echo json_encode([
    "success" => false,
    "mensaje" => "Usuario o contraseña incorrectos"
  ]);
}
