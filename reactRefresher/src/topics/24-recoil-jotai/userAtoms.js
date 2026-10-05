import { atom } from "jotai";

const fakeUsers = {
  1: { name: "Arun", city: "Hyderabad" },
  2: { name: "Priya", city: "Chennai" },
  3: { name: "Kiran", city: "Pune" },
};

export const userIdAtom = atom(1);

// Async derived atom (Recoil: async selector). The read function returns a
// Promise. Components reading it SUSPEND while it's pending, so wrap them in
// <Suspense fallback={...}>. When userIdAtom changes, it re-runs.
export const userAtom = atom(async (get) => {
  const id = get(userIdAtom);
  await new Promise((resolve) => setTimeout(resolve, 800)); // pretend network delay
  return { id, ...fakeUsers[id] };
});
