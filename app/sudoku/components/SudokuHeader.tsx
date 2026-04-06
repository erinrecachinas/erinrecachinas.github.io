import styles from "../sudoku.module.css";

export default function SudokuHeader() {
  return (
    <>
      <h1 className={styles.title}>Sudoku</h1>
      <h3 className={styles.subtitle}>
        by <a href="/">Erin Recachinas</a>
      </h3>
    </>
  );
}
