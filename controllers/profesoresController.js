const pool = require("../database/conection");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM profesores");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM profesores WHERE id = ?", [
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
  const { nombre, dni, materia } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO profesores (nombre, dni, materia) VALUES (?, ?, ?)",
      [nombre, dni, materia]
    );
    res.status(201).json({ id: result.insertId, nombre, dni, materia });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, dni, materia } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE profesores SET nombre = ?, dni = ?, materia = ? WHERE id = ?",
      [nombre, dni, materia, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ id: Number(id), nombre, dni, materia });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM profesores WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
