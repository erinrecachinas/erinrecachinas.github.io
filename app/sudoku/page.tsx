"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Board } from "./logic";
import type { WorkerRequest, WorkerResponse } from "./sudoku.worker";
import styles from "./sudoku.module.css";
import SudokuHeader from "./components/SudokuHeader";
import SudokuBoard from "./components/SudokuBoard";
import SudokuControls from "./components/SudokuControls";
import SudokuStatus from "./components/SudokuStatus";
import LoadingSpinner from "./components/LoadingSpinner";

const EMPTY_BOARD: Board = new Array(81).fill(0);

export default function SudokuPage() {
  const [board, setBoard] = useState<Board>(EMPTY_BOARD);
  const [initialCells, setInitialCells] = useState<Set<number>>(new Set());
  const [timer, setTimer] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL("./sudoku.worker.ts", import.meta.url));

    workerRef.current.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const data = e.data;
      setLoading(false);

      if (data.type === "generate") {
        setBoard(data.board);
        setInitialCells(new Set(data.initialCells));
        setTimer(`generate took ${Math.round(data.elapsed)} ms`);
        setMessage("");
      } else if (data.type === "solve") {
        const elapsed = (data.elapsed / 1000).toFixed(3);
        if (data.board) {
          setBoard(data.board);
          setTimer(`solve took ${elapsed} s`);
          setMessage("Board solved!");
        } else {
          setTimer(`fail took ${elapsed} s`);
          setMessage("Board unsolvable — please enter a valid board");
        }
      }
    };

    return () => workerRef.current?.terminate();
  }, []);

  const postMessage = useCallback((msg: WorkerRequest) => {
    setLoading(true);
    workerRef.current?.postMessage(msg);
  }, []);

  const handleGenerate = useCallback(() => {
    postMessage({ type: "generate" });
  }, [postMessage]);

  const handleSolve = useCallback(() => {
    postMessage({
      type: "solve",
      board,
      initialCells: [...initialCells],
    });
  }, [board, initialCells, postMessage]);

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
      <div className={styles.boardWrapper}>
        {loading && <LoadingSpinner />}
        <SudokuBoard board={board} initialCells={initialCells} onCellChange={handleCellChange} />
      </div>
      <SudokuControls onGenerate={handleGenerate} onSolve={handleSolve} />
      <SudokuStatus message={message} timer={timer} />
    </div>
  );
}
