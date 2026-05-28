import pool from "../config/db.js";

export async function getLogs(req, res) {
  const { habitId } = req.params;

  const [rows] = await pool.query(
    `SELECT * FROM habit_logs 
     WHERE habit_id = ? 
     ORDER BY date DESC 
     LIMIT 30`,
    [habitId],
  );

  res.json(rows);
}

export async function toggleLog(req, res) {
  const { habitId } = req.params;
  const today = new Date().toISOString().split("T")[0];

  const [existing] = await pool.query(
    "SELECT * FROM habit_logs WHERE habit_id = ? AND date = ?",
    [habitId, today],
  );

  if (existing.length > 0) {
    await pool.query("DELETE FROM habit_logs WHERE habit_id = ? AND date = ?", [
      habitId,
      today,
    ]);
    return res.json({ done: false });
  }

  await pool.query(
    "INSERT INTO habit_logs (habit_id, date, done) VALUES (?, ?, TRUE)",
    [habitId, today],
  );

  res.json({ done: true });
}

export async function getStreak(req, res) {
  const { habitId } = req.params;

  const [rows] = await pool.query(
    `SELECT date FROM habit_logs 
     WHERE habit_id = ? AND done = TRUE 
     ORDER BY date DESC`,
    [habitId],
  );

  if (rows.length === 0) return res.json({ streak: 0 });

  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (const row of rows) {
    const logDate = new Date(row.date);
    logDate.setHours(0, 0, 0, 0);

    const diff = (current - logDate) / (1000 * 60 * 60 * 24);

    if (diff === 0 || diff === 1) {
      streak++;
      current = logDate;
    } else {
      break;
    }
  }

  res.json({ streak });
}
