import { atom } from "jotai";

// Atom: one small piece of global state that any component can read or
// write, with no provider and no prop drilling.
// Recoil equivalent: atom({ key: "count", default: 0 })
export const countAtom = atom(0);

// Derived atom: computed from other atoms, and recalculated automatically
// when they change. Recoil calls this a selector:
//   selector({ key: "doubled", get: ({ get }) => get(countAtom) * 2 })
export const doubledAtom = atom((get) => get(countAtom) * 2);
