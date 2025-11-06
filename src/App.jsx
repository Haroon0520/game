import { useEffect, useState } from "react";
import "./styles.css";
import HUD from "./components/HUD";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import { LEVELS } from "./game/levels";
import { useGame } from "./game/useGame";

export default function App() {
  const [levelIndex, setLevelIndex] = useState(0);
  const level = LEVELS[levelIndex];

  const { start, tick, timeLeft, status, matches, remainingAdds, reset } = useGame();

  useEffect(() => { start(level); }, [level]);
  useEffect(() => {
    const id = setInterval(() => tick(), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="app">
      <div className="panel" style={{ marginBottom: 12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h2 style={{ margin: 0 }}>Number Match</h2>
          <div className="levelPicker">
            {LEVELS.map((lv, idx) => (
              <button
                key={lv.id}
                className={`levelBtn ${idx === levelIndex ? "active" : ""}`}
                onClick={() => setLevelIndex(idx)}
              >
                {lv.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <HUD
        level={level}
        matches={matches}
        remainingAdds={remainingAdds}
        timeLeft={timeLeft}
        status={status}
        onReset={reset}
      />

      <Grid />

      <div className="footer">
        <Controls />
        <div className="statusText">
          {status === "won" && "🎉 You Win!"}
          {status === "lost" && "⏲️ Time Up!"}
          {status === "running" && "Tap two cells: equal or sum to 10."}
        </div>
      </div>
    </div>
  );
}
