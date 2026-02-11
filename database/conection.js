const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "bendito_capricho",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
  maxIdle: 10,
  idleTimeout: 60000,
  waitForConnectionsMs: 10000,
});

// Manejo de errores del pool
pool.on("error", (err) => {
  console.error("Error en el pool de conexiones:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.error("Conexión a la base de datos perdida");
  }
  if (err.code === "PROTOCOL_ERROR") {
    console.error("Error de protocolo en la base de datos");
  }
  if (err.code === "ER_CON_COUNT_ERROR") {
    console.error("Demasiadas conexiones a la base de datos");
  }
  if (err.code === "ER_AUTHENTICATION_PLUGIN_ERROR") {
    console.error("Error de autenticación en la base de datos");
  }
});

module.exports = pool;
