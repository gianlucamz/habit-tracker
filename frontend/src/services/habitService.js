import api from "./api.js";

export async function getHabits() {
  const { data } = await api.get("/habits");
  return data;
}

export async function createHabit(title, color) {
  const { data } = await api.post("/habits", { title, color });
  return data;
}

export async function updateHabit(id, title, color) {
  const { data } = await api.put(`/habits/${id}`, { title, color });
  return data;
}

export async function deleteHabit(id) {
  const { data } = await api.delete(`/habits/${id}`);
  return data;
}

export async function toggleLog(habitId) {
  const { data } = await api.post(`/logs/${habitId}/toggle`);
  return data;
}

export async function getStreak(habitId) {
  const { data } = await api.get(`/logs/${habitId}/streak`);
  return data;
}

export async function getLogs(habitId) {
  const { data } = await api.get(`/logs/${habitId}`);
  return data;
}
