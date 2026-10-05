import { atomWithStorage } from "jotai/utils";

// atomWithStorage: an atom that saves itself to localStorage under the
// given key and reloads from it on startup. Recoil needed "atom effects"
// for this; Jotai has it built into jotai/utils.
export const fontSizeAtom = atomWithStorage("react-refresher-font-size", 16);
