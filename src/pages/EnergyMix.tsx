import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

interface FuelMix { fuel: string; perc: number; }
interface DailyEnergyMix { date: string; averageMix: FuelMix[]; cleanPercentage: number; }

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF00AA", "#00AAAA", "#FF5555", "#AAAAFF"];

const EnergyMix: React.FC = () => {
  const [data, setData] = useState<DailyEnergyMix[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/energy/mix")
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <div>
      <h1>Energy Mix</h1>
      {data.map((day, index) => {
        const chartData = day.averageMix.filter(f => f.perc > 0);
        const listData = [...day.averageMix].sort((a, b) => b.perc - a.perc);

        return (
          <div key={index} style={{ marginBottom: 50 }}>
            <h2>{day.date} – Clean Energy: {day.cleanPercentage.toFixed(2)}%</h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData as any}
                  dataKey="perc"
                  nameKey="fuel"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value?.toFixed(1)}%`}
                >
                  {chartData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <ul>
              {listData.map((fuel, idx) => (
                <li key={idx}>{fuel.fuel}: {fuel.perc.toFixed(1)}%</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default EnergyMix;
