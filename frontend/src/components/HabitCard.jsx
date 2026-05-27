export default function HabitCard({ habit, onDelete }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: habit.color }}
        />
        <span className="font-medium text-gray-800">{habit.title}</span>
      </div>
      <button
        onClick={() => onDelete(habit.id)}
        className="text-gray-400 hover:text-red-500 transition text-sm"
      >
        Arquivar
      </button>
    </div>
  );
}
