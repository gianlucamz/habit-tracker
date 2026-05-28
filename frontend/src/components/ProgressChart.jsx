import { useEffect, useState } from "react";
import { getLogs } from "../services/habitService.js";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ProgressChart({ habit }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    const logs = await getLogs(habit.id);

    const last7 = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const key = date.toISOString().split("T")[0];
      const label = date.toLocaleDateString("pt-BR", { weekday: "short" });
      const done = logs.some((l) => l.date?.startsWith(key));
      return { label, done };
    });

    setData(last7);
  }

  return (
    <div className="mt-3 h-20">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={16}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [value ? "Feito" : "Não feito"]}
            contentStyle={{ fontSize: 12 }}
          />
          <Bar dataKey="done" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.done ? "#6366f1" : "#e5e7eb"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
