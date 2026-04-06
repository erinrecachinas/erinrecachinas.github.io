import styles from "../sudoku.module.css";
import type { Board } from "../logic";

function getCellBorders(index: number): string {
  const row = Math.floor(index / 9);
  const col = index % 9;
  const classes: string[] = [];

  if (col === 2 || col === 5) classes.push(styles.boxRight);
  if (row === 2 || row === 5) classes.push(styles.boxBottom);

  return classes.join(" ");
}

interface SudokuBoardProps {
  board: Board;
  initialCells: Set<number>;
  onCellChange: (index: number, value: string) => void;
}

export default function SudokuBoard({ board, initialCells, onCellChange }: SudokuBoardProps) {
  return (
    <div className={styles.board}>
      {board.map((value, index) => (
        <input
          key={index}
          className={`${styles.cell} ${initialCells.has(index) ? styles.cellInitial : ""} ${getCellBorders(index)}`}
          value={value || ""}
          onChange={(e) => onCellChange(index, e.target.value)}
          maxLength={1}
          inputMode="numeric"
        />
      ))}
    </div>
  );
}
