import pool from "../config/db.js";

export async function getHabits(req, res) {
  const [rows] = await pool.query(
    "SELECT * FROM habits WHERE user_id = ? AND archived = FALSE",
    [req.userId],
  );
  res.json(rows);
}

export async function createHabit(req, res) {
  const { title, color } = req.body;

  const [result] = await pool.query(
    "INSERT INTO habits (user_id, title, color) VALUES (?, ?, ?)",
    [req.userId, title, color || "#6366f1"],
  );

  const [rows] = await pool.query("SELECT * FROM habits WHERE id = ?", [
    result.insertId,
  ]);

  res.status(201).json(rows[0]);
}

export async function updateHabit(req, res) {
  const { title, color } = req.body;
  const { id } = req.params;

  await pool.query(
    "UPDATE habits SET title = ?, color = ? WHERE id = ? AND user_id = ?",
    [title, color, id, req.userId],
  );

  const [rows] = await pool.query("SELECT * FROM habits WHERE id = ?", [id]);

  res.json(rows[0]);
}

export async function deleteHabit(req, res) {
  const { id } = req.params;

  await pool.query(
    "UPDATE habits SET archived = TRUE WHERE id = ? AND user_id = ?",
    [id, req.userId],
  );

  res.json({ message: "Hábito arquivado com sucesso" });
}
