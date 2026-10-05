// Why Fragments matter: a <tr> may only contain <td> cells. If this component
// wrapped its cells in a <div>, the HTML would be invalid and the table would
// break. <>...</> groups the cells without adding any element to the page.
function TableColumns({ name, score }) {
  return (
    <>
      <td>{name}</td>
      <td>{score}</td>
    </>
  );
}

export default TableColumns;
