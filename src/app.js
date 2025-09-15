const express = require("express");
const { port } = require("./config/env");

const app = express();

// ------------------ DATOS DE EJEMPLO (sembrador) ------------------ //
const exercises = [
  { id: 1, name: "Press de Banca", description: "Ejercicio de fuerza para el pecho" },
  { id: 2, name: "Sentadillas", description: "Ejercicio de fuerza para piernas" },
  { id: 3, name: "Dominadas", description: "Ejercicio de fuerza para espalda y brazos" },
];

const users = [
  { id: 1, name: "Carlos", progress: "Intermedio" },
  { id: 2, name: "Ana", progress: "Avanzado" },
];

const workouts = [
  { id: 1, userId: 1, exercise: "Press de Banca", date: "2025-09-10" },
  { id: 2, userId: 2, exercise: "Sentadillas", date: "2025-09-12" },
];

// ------------------ RUTAS BÁSICAS ------------------ //
app.get("/", (req, res) => {
  res.send("<h1>🏋️ Bienvenido a Workout Tracker</h1><p>API para gestionar usuarios, ejercicios y entrenamientos.</p>");
});

app.get("/acerca-de", (req, res) => {
  res.send("<h1>ℹ️ Acerca de Workout Tracker</h1><p>Aplicación desarrollada con Node.js y Express como caso de estudio para el seguimiento de entrenamientos.</p>");
});

// ------------------ MÉTODO GET: EJERCICIOS ------------------ //
// Listar todos los ejercicios
app.get("/api/v1/exercises", (req, res) => {
  res.json(exercises);
});

// Obtener un ejercicio por ID
app.get("/api/v1/exercises/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const exercise = exercises.find((e) => e.id === id);

  if (!exercise) {
    return res.status(404).json({ error: "Ejercicio no encontrado" });
  }
  res.json(exercise);
});

// ------------------ MÉTODO GET: USUARIOS ------------------ //
// Perfil de usuario
app.get("/api/v1/users", (req, res) => {
  res.json(users);
});

// Usuario por ID
app.get("/api/v1/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  res.json(user);
});

// ------------------ MÉTODO GET: ENTRENAMIENTOS ------------------ //
// Listar entrenamientos
app.get("/api/v1/workouts", (req, res) => {
  res.json(workouts);
});

// Historial de entrenamientos por usuario
app.get("/api/v1/workouts/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userWorkouts = workouts.filter((w) => w.userId === userId);

  if (userWorkouts.length === 0) {
    return res.status(404).json({ error: "No hay entrenamientos para este usuario" });
  }
  res.json(userWorkouts);
});

// ------------------ INFORMACIÓN DE LA SOLICITUD ------------------ //
app.get("/informacion", (req, res) => {
  const metodo = req.method;
  const url = req.url;
  const headers = req.headers;

  const respuesta = `
    <h2>📌 Información de la solicitud</h2>
    <p><b>Método:</b> ${metodo}</p>
    <p><b>URL:</b> ${url}</p>
    <p><b>User-Agent:</b> ${headers["user-agent"]}</p>
    <hr>
    <h3>💪 Workout Tracker API</h3>
    <p>Consulta datos de <b>usuarios</b>, <b>ejercicios</b> y <b>entrenamientos</b>.</p>
  `;
  res.send(respuesta);
});

// ------------------ INICIO DEL SERVIDOR ------------------ //
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
