const pool = require('../database/conection');

exports.getAll = async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM cursos');
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getById = async (req, res) => {
	const { id } = req.params;
	try {
		const [rows] = await pool.query('SELECT * FROM cursos WHERE id = ?', [id]);
		if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
		res.json(rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.create = async (req, res) => {
	const { nombre, descripcion } = req.body;
	try {
		const [result] = await pool.query('INSERT INTO cursos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
		res.status(201).json({ id: result.insertId, nombre, descripcion });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.update = async (req, res) => {
	const { id } = req.params;
	const { nombre, descripcion } = req.body;
	try {
		const [result] = await pool.query('UPDATE cursos SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id]);
		if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' });
		res.json({ id: Number(id), nombre, descripcion });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.remove = async (req, res) => {
	const { id } = req.params;
	try {
		const [result] = await pool.query('DELETE FROM cursos WHERE id = ?', [id]);
		if (result.affectedRows === 0) return res.status(404).json({ error: 'No encontrado' });
		res.json({ ok: true });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
