import { useState, useEffect } from "react";
import { toggleLog, getStreak, getLogs } from "../services/habitService.js";
import ProgressChart from "./ProgressChart.jsx";

export default function HabitCard({ habit, onDelete }) {
  const [done, setDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchStreak();
    checkToday();
  }, []);

  async function fetchStreak() {
    const data = await getStreak(habit.id);
    setStreak(data.streak);
  }

  async function checkToday() {
    const today = new Date().toISOString().split("T")[0];
    const data = await getLogs(habit.id);
    const todayLog = data?.find((l) => l.date?.startsWith(today));
    if (todayLog) setDone(true);
  }

  async function handleToggle() {
    const result = await toggleLog(habit.id);
    setDone(result.done);
    const streakData = await getStreak(habit.id);
    setStreak(streakData.streak);
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer flex-1"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <div
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: habit.color }}
          />
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-100">
              {habit.title}
            </p>
            <p className="text-xs text-gray-400">🔥 {streak} dias seguidos</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className={`w-8 h-8 rounded-full border-2 transition flex items-center justify-center text-sm ${
              done
                ? "bg-indigo-500 border-indigo-500 text-white"
                : "border-gray-300 dark:border-gray-600 text-gray-300"
            }`}
          >
            {done ? "✓" : ""}
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="text-gray-400 hover:text-red-500 transition text-sm"
          >
            Arquivar
          </button>
        </div>
      </div>

      {expanded && <ProgressChart habit={habit} />}
    </div>
  );
}
