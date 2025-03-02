require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado a MySQL");
});

// Endpoint para recibir datos desde Roblox
app.post('/new_request', (req, res) => {
    const { data } = req.body;
    db.query("INSERT INTO requests (data) VALUES (?)", [data], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Solicitud almacenada");
    });
});

// Endpoint para obtener todas las solicitudes
app.get('/get_requests', (req, res) => {
    db.query("SELECT * FROM requests", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));
