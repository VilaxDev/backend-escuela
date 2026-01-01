const pool = require("../database/conection");

exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const [rows] = await pool.query(
      "SELECT * FROM transactions ORDER BY date DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    const [[{ total }]] = await pool.query(
      "SELECT COUNT(*) as total FROM transactions"
    );

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM transactions WHERE id = ?", [
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
  const { type, category, amount, date, description } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)",
      [type, category, amount, date, description]
    );

    res.status(201).json({
      id: result.insertId,
      type,
      category,
      amount,
      date,
      description,
      created_at: new Date(), // simulamos el timestamp
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description, created_at } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ?, created_at = ? WHERE id = ?",
      [type, category, amount, date, description, created_at, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({
      id: Number(id),
      type,
      category,
      amount,
      date,
      description,
      created_at: new Date(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM transactions WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
