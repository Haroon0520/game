export default function HUD({ level, matches, remainingAdds, timeLeft, status, onReset }) {
  return (
    <div className="hud">
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div className="badge">{level.name}</div>
        <div className="badge">⏱ {timeLeft}s</div>
        <div className="badge">➕ rows: {remainingAdds}</div>
        <div className="badge">rule: equal or sum 10</div>
        <div className="badge">status: {status}</div>
      </div>
      <button className="button" onClick={onReset}>Restart</button>
    </div>
  );
}
