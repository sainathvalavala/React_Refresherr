import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useCounter from "../19-custom-hooks/useCounter";

// renderHook: test a custom hook (topic 19) directly, without writing a
// component for it. result.current is the hook's latest return value.
// act() wraps anything that updates state, so React finishes re-rendering
// before we check the result.
describe("useCounter", () => {
  it("starts at the initial value", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it("increments and decrements by the step", () => {
    const { result } = renderHook(() => useCounter(0, 10));

    act(() => result.current.increment());
    act(() => result.current.increment());
    expect(result.current.count).toBe(20);

    act(() => result.current.decrement());
    expect(result.current.count).toBe(10);
  });

  it("resets to the initial value", () => {
    const { result } = renderHook(() => useCounter(3));

    act(() => result.current.increment());
    act(() => result.current.reset());
    expect(result.current.count).toBe(3);
  });
});
