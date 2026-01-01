const pool = require("../database/conection");

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reminders");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM reminders WHERE id = ?", [
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
  const { reservation_id, message_type, status, sent_at } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO reminders (reservation_id, message_type, status, sent_at) VALUES (?, ?, ?, ?)",
      [reservation_id, message_type, status, sent_at]
    );
    res
      .status(201)
      .json({
        id: result.insertId,
        reservation_id,
        message_type,
        status,
        sent_at,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { reservation_id, message_type, status, sent_at } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE reminders SET reservation_id = ?, message_type = ?, status = ?, sent_at = ? WHERE id = ?",
      [reservation_id, message_type, status, sent_at, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ id: Number(id), reservation_id, message_type, status, sent_at });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM reminders WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
