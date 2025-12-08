import React, { useState } from "react";

interface OptimalWindowResponse {
  startDateTime: string;
  endDateTime: string;
  averageCleanEnergy: number;
}

const OptimalWindow: React.FC = () => {
  const [windowHours, setWindowHours] = useState<number>(1);
  const [optimalWindow, setOptimalWindow] = useState<OptimalWindowResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOptimalWindow = () => {
    if (windowHours < 1 || windowHours > 6) {
      setError("Czas ładowania musi być od 1 do 6 godzin");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://localhost:8080/energy/optimal-window?windowHours=${windowHours}`)
      .then(res => {
        if (!res.ok) throw new Error("Błąd w zapytaniu");
        return res.json();
      })
      .then((data: OptimalWindowResponse) => setOptimalWindow(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Optymalne Okno Ładowania</h1>

      <label>
        Czas ładowania (1–6h):
        <input
          type="number"
          min={1}
          max={6}
          value={windowHours}
          onChange={e => setWindowHours(Number(e.target.value))}
          style={{ marginLeft: 8, width: 50 }}
        />
      </label>
      <button onClick={fetchOptimalWindow} style={{ marginLeft: 10 }}>Sprawdź</button>

      {loading && <p>Ładowanie...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {optimalWindow && (
        <div style={{ marginTop: 20 }}>
          <p>Rozpoczęcie: {new Date(optimalWindow.startDateTime).toLocaleString()}</p>
          <p>Zakończenie: {new Date(optimalWindow.endDateTime).toLocaleString()}</p>
          <p>Średni udział czystej energii: {optimalWindow.averageCleanEnergy.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default OptimalWindow;
