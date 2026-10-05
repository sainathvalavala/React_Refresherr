import { useAtomValue } from "jotai";
import { fontSizeAtom } from "./settingsAtoms";

// A separate component reading the same persisted atom.
function PreviewText() {
  const fontSize = useAtomValue(fontSizeAtom);

  return <p style={{ fontSize }}>This text follows the saved font size. Refresh the page: it stays.</p>;
}

export default PreviewText;
