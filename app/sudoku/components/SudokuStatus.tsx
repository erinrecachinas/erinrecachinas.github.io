import styles from "../sudoku.module.css";

interface SudokuStatusProps {
  message: string;
  timer: string;
}

export default function SudokuStatus({ message, timer }: SudokuStatusProps) {
  return (
    <>
      {message && <div className={styles.message}>{message}</div>}
      {timer && <div className={styles.timer}>{timer}</div>}
    </>
  );
}
