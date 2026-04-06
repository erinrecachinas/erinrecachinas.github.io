import { generate, solve } from "./logic";

export type WorkerRequest =
  | { type: "generate" }
  | { type: "solve"; board: number[]; initialCells: number[] };

export type WorkerResponse =
  | { type: "generate"; board: number[]; initialCells: number[]; elapsed: number }
  | { type: "solve"; board: number[] | null; elapsed: number };

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const msg = e.data;

  if (msg.type === "generate") {
    const start = performance.now();
    const result = generate();
    const elapsed = performance.now() - start;
    const resp: WorkerResponse = {
      type: "generate",
      board: result.board,
      initialCells: [...result.initial],
      elapsed,
    };
    self.postMessage(resp);
  } else if (msg.type === "solve") {
    const start = performance.now();
    const initialSet = new Set(msg.initialCells);
    const result = solve(msg.board, initialSet);
    const elapsed = performance.now() - start;
    const resp: WorkerResponse = {
      type: "solve",
      board: result,
      elapsed,
    };
    self.postMessage(resp);
  }
};
