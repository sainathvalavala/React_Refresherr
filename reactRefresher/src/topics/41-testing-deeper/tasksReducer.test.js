import { describe, expect, it } from "vitest";
import { tasksReducer } from "../29-useReducer/tasksReducer";

// Unit-testing a reducer (topic 29): it's a pure function, so no React,
// no rendering and no DOM are needed. Give it a state and an action, then
// check what it returns. These are the fastest, simplest tests you can write.
const start = [
  { id: 1, text: "A", done: false },
  { id: 2, text: "B", done: true },
];

describe("tasksReducer", () => {
  it("adds a task", () => {
    const next = tasksReducer(start, { type: "added", id: 3, text: "C" });
    expect(next).toHaveLength(3);
    expect(next[2]).toEqual({ id: 3, text: "C", done: false });
  });

  it("toggles a task without mutating the old state", () => {
    const next = tasksReducer(start, { type: "toggled", id: 1 });
    expect(next[0].done).toBe(true);
    expect(start[0].done).toBe(false); // the original array is untouched
  });

  it("clears done tasks", () => {
    const next = tasksReducer(start, { type: "clearedDone" });
    expect(next.map((t) => t.text)).toEqual(["A"]);
  });

  it("throws on an unknown action", () => {
    expect(() => tasksReducer(start, { type: "typo" })).toThrow("Unknown action: typo");
  });
});
