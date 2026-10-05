import CodeBlock from "./CodeBlock";

// Example: a titled card holding one live demo inside a lesson. If a code
// string is passed, a "Show code" toggle reveals the demo's source file.
// <details>/<summary> is plain HTML: a built-in show/hide that needs no state.
function Example({ title, code, children }) {
  return (
    <section className="example">
      <h3>{title}</h3>
      {children}
      {code && (
        <details>
          <summary>Show code</summary>
          <CodeBlock code={code} />
        </details>
      )}
    </section>
  );
}

export default Example;
