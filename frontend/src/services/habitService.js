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
