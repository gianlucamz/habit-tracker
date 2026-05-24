import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import { signToken } from "../config/jwt.js";

export async function register(req, res) {
  const { name, email, password } = req.body;

  const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [
    email,
  ]);
  if (existing.length > 0) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [name, email, password_hash],
  );

  const token = signToken({ id: result.insertId });

  res.status(201).json({ token });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (rows.length === 0) {
    return res.status(401).json({ message: "Email ou senha inválidos" });
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: "Email ou senha inválidos" });
  }

  const token = signToken({ id: user.id });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}
