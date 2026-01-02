const pool = require("../database/conection");

exports.auth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length === 0)
      return res.status(401).json({ error: "Credenciales inválidas" });
    res.json({ ok: true, message: "Autenticación exitosa", user: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    res.status(201).json({
      id: result.insertId,
      name,
      email,
      password,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({
      id: Number(id),
      name,
      email,
      password,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
