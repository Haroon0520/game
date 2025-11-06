import { create } from "zustand";

const makeId = () => Math.random().toString(36).slice(2, 9);

function makeEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null)
  );
}

function makeSparseRow(cols, pool) {
  return Array.from({ length: cols }, () => ({
    id: makeId(),
    value: pool[Math.floor(Math.random() * pool.length)],
    matched: false
  }));
}


export const useGame = create((set, get) => ({
  level: {},
  grid: [],
  selected: null,             // {r,c} OR null
  remainingAdds: 0,
  matches: 0,
  timeLeft: 0,
  status: "ready",            // "running" | "won" | "lost"
  invalidFlash: [],           // [{r,c}, ...]

  start: (level) => {
    const g = makeEmptyGrid(level.rows, level.cols);
    for (let r = 0; r < level.startFilledRows; r++) {
      g[r] = makeSparseRow(level.cols, level.pool);
    }
    set({
      level,
      grid: g,
      selected: null,
      remainingAdds: level.addRowLimit,
      matches: 0,
      timeLeft: level.timeLimitSec,
      status: "running",
      invalidFlash: []
    });
  },

  tick: () => {
    const { status, timeLeft } = get();
    if (status !== "running") return;
    if (timeLeft <= 1) set({ timeLeft: 0, status: "lost" });
    else set({ timeLeft: timeLeft - 1 });
  },

  canMatch: (a, b) => {
    if (!a || !b) return false;
    if (a.matched || b.matched) return false;
    if (a.value === 0 || b.value === 0) return false;
    return a.value === b.value || a.value + b.value === 10;
  },

  select: (r, c) => {
    const { grid, selected, canMatch, matches, level } = get();
    const cell = grid[r][c];
    if (!cell || cell.matched) return;

    // first pick
    if (!selected) {
      set({ selected: { r, c } });
      return;
    }

    // same cell => deselect
    if (selected.r === r && selected.c === c) {
      set({ selected: null });
      return;
    }

    const first = grid[selected.r][selected.c];
    const second = cell;

    if (canMatch(first, second)) {
      const g2 = grid.map(row => [...row]);
      g2[selected.r][selected.c] = { ...first, matched: true };
      g2[r][c] = { ...second, matched: true };

      const newMatches = matches + 1;
      const won = newMatches >= level.targetMatches;

      set({
        grid: g2,
        selected: null,
        matches: newMatches,
        status: won ? "won" : "running",
        invalidFlash: []
      });
    } else {
      set({ invalidFlash: [{ r: selected.r, c: selected.c }, { r, c }] });
      setTimeout(() => set({ invalidFlash: [] }), 150);
      set({ selected: { r, c } });
    }
  },

  addRow: () => {
    const { remainingAdds, level, grid, status } = get();
    if (status !== "running" || remainingAdds <= 0) return;

    const g2 = grid.map(row => [...row]);
    let insertAt = level.startFilledRows; // simple: insert near the initial block

    // shift rows downward from the bottom to make room
    for (let r = level.rows - 1; r > insertAt; r--) {
      g2[r] = g2[r - 1];
    }
    g2[insertAt] = makeSparseRow(level.cols, level.pool);

    set({ grid: g2, remainingAdds: remainingAdds - 1 });
  },

  reset: () => {
    const { level } = get();
    get().start(level);
  }
}));
