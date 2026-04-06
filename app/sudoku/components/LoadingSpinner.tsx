import styles from "../sudoku.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner} />
    </div>
  );
}
