import { useState, useEffect } from "react";
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from "../services/habitService.js";

export function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    setLoading(true);
    const data = await getHabits();
    setHabits(data);
    setLoading(false);
  }

  async function addHabit(title, color) {
    const newHabit = await createHabit(title, color);
    setHabits((prev) => [...prev, newHabit]);
  }

  async function editHabit(id, title, color) {
    const updated = await updateHabit(id, title, color);
    setHabits((prev) => prev.map((h) => (h.id === id ? updated : h)));
  }

  async function removeHabit(id) {
    await deleteHabit(id);
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  return { habits, loading, addHabit, editHabit, removeHabit };
}
