// CodeBlock: shows a snippet of source code as plain text. <pre> keeps the
// line breaks and indentation of the string exactly as written.
function CodeBlock({ code }) {
  return (
    <pre className="code">
      <code>{code.trim()}</code>
    </pre>
  );
}

export default CodeBlock;
