// A tiny external store (read with useSyncExternalStore, topic 34) that
// collects Profiler measurements. Why not useState? onRender runs after
// every commit; setting state in the Profiler's parent would re-render it,
// which commits again, which calls onRender again: an endless loop.
// Writing to this store only re-renders the separate log component.
let entries = [];
const listeners = new Set();

export const profilerLog = {
  add(entry) {
    entries = [entry, ...entries].slice(0, 8); // newest first, keep the last 8
    // Notify after React finishes the current commit
    queueMicrotask(() => listeners.forEach((listener) => listener()));
  },
  clear() {
    entries = [];
    listeners.forEach((listener) => listener());
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return entries;
  },
};
