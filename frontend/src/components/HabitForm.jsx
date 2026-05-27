import { useState } from "react";

const COLORS = [
  "#6366f1",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
];

export default function HabitForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#6366f1");

  async function handleSubmit() {
    if (!title.trim()) return;
    await onSubmit(title, color);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold mb-4">Novo hábito</h2>

        <input
          type="text"
          placeholder="Nome do hábito"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <p className="text-sm text-gray-500 mb-2">Cor</p>
        <div className="flex gap-2 mb-6">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-8 h-8 rounded-full border-2 transition"
              style={{
                backgroundColor: c,
                borderColor: color === c ? "#000" : "transparent",
              }}
            />
          ))}
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
