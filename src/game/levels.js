export const LEVELS = [
  {
    id: 1,
    name: "Level 1",
    rows: 5,              // bigger grid like the image
    cols: 8,
    startFilledRows: 5,   // fill entire grid
    addRowLimit: 3,
    pool: [1,2,3,4,5,6,7,8,9],
    timeLimitSec: 120,
  },
  {
    id: 2,
    name: "Level 2",
    rows: 7,
    cols: 10,
    startFilledRows: 7,
    addRowLimit: 4,
    pool: [1,2,3,4,5,6,7,8,9],
    timeLimitSec: 120,
  },
  {
    id: 3,
    name: "Level 3",
    rows: 9,
    cols: 12,
    startFilledRows: 9,
    addRowLimit: 5,
    pool: [1,2,3,4,5,6,7,8,9],
    timeLimitSec: 120,
  }
];
