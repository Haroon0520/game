import Cell from "./Cell";
import { useGame } from "../game/useGame";

export default function Grid() {
  const { grid, selected, select, invalidFlash } = useGame();
  const cols = grid[0]?.length ?? 0;

  return (
    <div className="grid panel" style={{ gridTemplateColumns: `repeat(${cols}, 44px)` }}>
      {grid.map((row, r) =>
        row.map((cell, c) => {
          const isSelected = selected?.r === r && selected?.c === c;
          const isInvalid = invalidFlash.some(p => p.r === r && p.c === c);
          return (
            <Cell
              key={cell?.id ?? `${r}-${c}`}
              value={cell?.value ?? 0}
              matched={cell?.matched ?? true}
              selected={isSelected}
              invalid={isInvalid}
              onClick={() => select(r, c)}
            />
          );
        })
      )}
    </div>
  );
}
