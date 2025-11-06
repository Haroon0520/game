import { useGame } from "../game/useGame";

export default function Controls() {
  const { remainingAdds, addRow, status } = useGame();
  return (
    <div className="controls">
      <button className="button" onClick={addRow} disabled={remainingAdds <= 0 || status !== "running"}>
        ➕ Add Row
      </button>
    </div>
  );
}
