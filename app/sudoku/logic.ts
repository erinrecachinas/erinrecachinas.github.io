const GRID_SIZE = 9;
const BOX_SIZE = 3;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

export type Board = number[];

function getRow(cell: number): number {
  return Math.floor(cell / GRID_SIZE);
}

function getCol(cell: number): number {
  return cell % GRID_SIZE;
}

function getBoxStart(cell: number): { row: number; col: number } {
  return {
    row: Math.floor(getRow(cell) / BOX_SIZE) * BOX_SIZE,
    col: Math.floor(getCol(cell) / BOX_SIZE) * BOX_SIZE,
  };
}

function isValidPlacement(board: Board, cell: number): boolean {
  const value = board[cell];
  if (value === 0) return true;

  const row = getRow(cell);
  const col = getCol(cell);

  // Check row
  for (let c = 0; c < GRID_SIZE; c++) {
    const idx = row * GRID_SIZE + c;
    if (idx !== cell && board[idx] === value) return false;
  }

  // Check column
  for (let r = 0; r < GRID_SIZE; r++) {
    const idx = r * GRID_SIZE + col;
    if (idx !== cell && board[idx] === value) return false;
  }

  // Check 3x3 box
  const box = getBoxStart(cell);
  for (let r = box.row; r < box.row + BOX_SIZE; r++) {
    for (let c = box.col; c < box.col + BOX_SIZE; c++) {
      const idx = r * GRID_SIZE + c;
      if (idx !== cell && board[idx] === value) return false;
    }
  }

  return true;
}

export function generate(): { board: Board; initial: Set<number> } {
  const board: Board = new Array(TOTAL_CELLS).fill(0);
  const numCells = Math.floor(Math.random() * 16) + 16;

  for (let k = 0; k <= numCells; k++) {
    const cell = Math.floor(Math.random() * TOTAL_CELLS);
    if (board[cell] !== 0) continue;

    const startVal = Math.floor(Math.random() * 9) + 1;
    let found = false;

    for (let attempt = 0; attempt < 9; attempt++) {
      board[cell] = ((startVal + attempt - 1) % 9) + 1;
      if (isValidPlacement(board, cell)) {
        found = true;
        break;
      }
    }

    if (!found) board[cell] = 0;
  }

  const initial = new Set<number>();
  board.forEach((val, idx) => {
    if (val !== 0) initial.add(idx);
  });

  return { board, initial };
}

export function solve(inputBoard: Board, initialCells: Set<number>): Board | null {
  const board = [...inputBoard];
  let cell = 0;
  let forward = true;

  while (cell >= 0 && cell < TOTAL_CELLS) {
    if (initialCells.has(cell)) {
      cell += forward ? 1 : -1;
      continue;
    }

    if (board[cell] >= 9) {
      board[cell] = 0;
      forward = false;
      cell--;
      continue;
    }

    board[cell]++;

    if (isValidPlacement(board, cell)) {
      forward = true;
      cell++;
    }
  }

  if (cell >= TOTAL_CELLS) return board;
  return null;
}
