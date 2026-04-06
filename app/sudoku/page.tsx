"use client";

import { useState, useCallback } from "react";
import { generate, solve, type Board } from "./logic";
import styles from "./sudoku.module.css";

const EMPTY_BOARD: Board = new Array(81).fill(0);

function getCellBorders(index: number): string {
  const row = Math.floor(index / 9);
  const col = index % 9;
  const classes: string[] = [];

  if (col === 2 || col === 5) classes.push(styles.boxRight);
  if (row === 2 || row === 5) classes.push(styles.boxBottom);

  return classes.join(" ");
}

export default function SudokuPage() {
  const [board, setBoard] = useState<Board>(EMPTY_BOARD);
  const [initialCells, setInitialCells] = useState<Set<number>>(new Set());
  const [timer, setTimer] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerate = useCallback(() => {
    const start = performance.now();
    const result = generate();
    const elapsed = Math.round(performance.now() - start);
    setBoard(result.board);
    setInitialCells(result.initial);
    setTimer(`generate took ${elapsed} ms`);
    setMessage("");
  }, []);

  const handleSolve = useCallback(() => {
    const start = performance.now();
    const result = solve(board, initialCells);
    const elapsed = ((performance.now() - start) / 1000).toFixed(3);

    if (result) {
      setBoard(result);
      setTimer(`solve took ${elapsed} s`);
      setMessage("Board solved!");
    } else {
      setTimer(`fail took ${elapsed} s`);
      setMessage("Board unsolvable — please enter a valid board");
    }
  }, [board, initialCells]);

  const handleCellChange = useCallback(
    (index: number, value: string) => {
      if (initialCells.has(index)) return;

      const num = parseInt(value.slice(-1));
      const newBoard = [...board];
      newBoard[index] = num >= 1 && num <= 9 ? num : 0;
      setBoard(newBoard);
    },
    [board, initialCells]
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Sudoku</h1>
      <h3 className={styles.subtitle}>
        by <a href="/">Erin Recachinas</a>
      </h3>

      <div className={styles.board}>
        {board.map((value, index) => (
          <input
            key={index}
            className={`${styles.cell} ${initialCells.has(index) ? styles.cellInitial : ""} ${getCellBorders(index)}`}
            value={value || ""}
            onChange={(e) => handleCellChange(index, e.target.value)}
            maxLength={1}
            inputMode="numeric"
          />
        ))}
      </div>

      <div className={styles.buttons}>
        <button className={styles.generateBtn} onClick={handleGenerate}>
          generate
        </button>
        <button className={styles.solveBtn} onClick={handleSolve}>
          solve
        </button>
      </div>

      {message && <div className={styles.message}>{message}</div>}
      {timer && <div className={styles.timer}>{timer}</div>}
    </div>
  );
}
