import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">Habit Tracker</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          Olá, {user?.name}
        </span>
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {dark ? "☀️ Claro" : "🌙 Escuro"}
        </button>
        <button
          onClick={logout}
          className="text-sm text-red-500 hover:underline"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
