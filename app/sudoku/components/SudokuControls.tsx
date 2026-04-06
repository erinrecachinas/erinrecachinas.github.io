import styles from "../sudoku.module.css";

interface SudokuControlsProps {
  onGenerate: () => void;
  onSolve: () => void;
}

export default function SudokuControls({ onGenerate, onSolve }: SudokuControlsProps) {
  return (
    <div className={styles.buttons}>
      <button className={styles.generateBtn} onClick={onGenerate}>
        generate
      </button>
      <button className={styles.solveBtn} onClick={onSolve}>
        solve
      </button>
    </div>
  );
}
