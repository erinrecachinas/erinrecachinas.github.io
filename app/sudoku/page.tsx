"use client";

import { useState, useCallback } from "react";
import { generate, solve, type Board } from "./logic";
import styles from "./sudoku.module.css";
import SudokuHeader from "./components/SudokuHeader";
import SudokuBoard from "./components/SudokuBoard";
import SudokuControls from "./components/SudokuControls";
import SudokuStatus from "./components/SudokuStatus";

const EMPTY_BOARD: Board = new Array(81).fill(0);

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
      <SudokuHeader />
      <SudokuBoard board={board} initialCells={initialCells} onCellChange={handleCellChange} />
      <SudokuControls onGenerate={handleGenerate} onSolve={handleSolve} />
      <SudokuStatus message={message} timer={timer} />
    </div>
  );
}
