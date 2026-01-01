const pool = require("../database/conection");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reservations");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM reservations WHERE id = ?", [
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
  const { client, service, date, status, phone, created_at } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO reservations (client, service, date, status, phone, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      [client, service, date, status, phone, created_at]
    );
    res
      .status(201)
      .json({
        id: result.insertId,
        client,
        service,
        date,
        status,
        phone,
        created_at,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { client, service, date, status, phone, created_at } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE reservations SET client = ?, service = ?, date = ?, status = ?, phone = ?, created_at = ? WHERE id = ?",
      [client, service, date, status, phone, created_at, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({
      id: Number(id),
      client,
      service,
      date,
      status,
      phone,
      created_at,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM reservations WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
