// Fragments keep CSS layouts working. The parent is a 2-column CSS grid
// (label | input). Each direct child fills one cell, so the label and
// input must be DIRECT children of the grid.
//   wrapper="fragment" -> label and input land in the grid: aligned
//   wrapper="div"      -> each <div> takes ONE cell and squashes the pair inside it
function NameFields({ wrapper }) {
  if (wrapper === "div") {
    return (
      <div>
        <label>First name</label>
        <input />
      </div>
    );
  }

  return (
    <>
      <label>First name</label>
      <input />
    </>
  );
}

export default NameFields;
