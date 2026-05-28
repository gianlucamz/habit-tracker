import { useState } from "react";
import { useHabits } from "../hooks/useHabits.js";
import Navbar from "../components/Navbar.jsx";
import HabitCard from "../components/HabitCard.jsx";
import HabitForm from "../components/HabitForm.jsx";

export default function Dashboard() {
  const { habits, loading, addHabit, removeHabit } = useHabits();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Meus hábitos
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition text-sm"
          >
            + Novo hábito
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Carregando...</p>
        ) : habits.length === 0 ? (
          <p className="text-gray-400 text-center">
            Nenhum hábito ainda. Crie o primeiro!
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} onDelete={removeHabit} />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <HabitForm onSubmit={addHabit} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
