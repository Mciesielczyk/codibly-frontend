import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EnergyMix from "./pages/EnergyMix";
import OptimalWindow from "./pages/OptimalWindow";

function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/mix">Energy Mix</Link>
          <Link to="/optimal-window" style={{ marginLeft: 10 }}>Optymalne Okno</Link>
        </nav>

        <Routes>
          <Route path="/mix" element={<EnergyMix />} />
          <Route path="/optimal-window" element={<OptimalWindow />} />
          <Route path="*" element={<EnergyMix />} /> {/* domyślna strona */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
