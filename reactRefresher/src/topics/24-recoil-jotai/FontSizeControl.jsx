import { useAtom } from "jotai";
import { fontSizeAtom } from "./settingsAtoms";

function FontSizeControl() {
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);

  return (
    <div className="row">
      <button onClick={() => setFontSize(Math.max(10, fontSize - 2))}>A-</button>
      <span>{fontSize}px</span>
      <button onClick={() => setFontSize(Math.min(32, fontSize + 2))}>A+</button>
    </div>
  );
}

export default FontSizeControl;
