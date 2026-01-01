const pool = require("../database/conection");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM estudiantes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM estudiantes WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO estudiantes (nombre, email) VALUES (?, ?)",
      [nombre, email]
    );
    res.status(201).json({ id: result.insertId, nombre, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE estudiantes SET nombre = ?, email = ? WHERE id = ?",
      [nombre, email, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ id: Number(id), nombre, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM estudiantes WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
