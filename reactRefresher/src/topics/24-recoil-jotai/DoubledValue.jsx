import { useAtomValue } from "jotai";
import { doubledAtom } from "./atoms";

// Derived atoms are read with the same hooks as normal atoms.
function DoubledValue() {
  const doubled = useAtomValue(doubledAtom);

  return <p>Doubled (derived atom): {doubled}</p>;
}

export default DoubledValue;
