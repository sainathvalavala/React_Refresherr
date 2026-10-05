import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import NewsletterForm from "./NewsletterForm";
import OptimisticComments from "./OptimisticComments";
import newsletterCode from "./NewsletterForm.jsx?raw";
import submitButtonCode from "./SubmitButton.jsx?raw";
import optimisticCode from "./OptimisticComments.jsx?raw";
import fakeServerCode from "./fakeServer.js?raw";

function FormActionsLesson() {
  return (
    <Lesson
      number={28}
      title="Form actions (React 19)"
      definition="An Action is a function, often async, passed to <form action={...}>. React calls it with the form's data and manages the pending state, errors, form reset and optimistic updates for you."
    >
      <Explain title="How it works">
        <p>
          Topic 27's forms needed a lot of manual work: <code>preventDefault</code>,
          a loading flag, an error state, and resetting the fields. React 19
          builds this in:
        </p>
        <CodeBlock
          code={`
// Before: manual
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  try { await save(new FormData(e.target)); } catch (err) { setError(err); }
  setLoading(false);
}
<form onSubmit={handleSubmit}>

// React 19: pass a function to action. It receives FormData directly.
async function save(formData) { await api.save(formData.get("email")); }
<form action={save}>
`}
        />
        <table>
          <thead>
            <tr>
              <th>Hook</th>
              <th>From</th>
              <th>Gives you</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>useActionState(action, initial)</td>
              <td>react</td>
              <td>[state returned by the action, formAction, isPending]</td>
            </tr>
            <tr>
              <td>useFormStatus()</td>
              <td>react-dom</td>
              <td>
                {"{ pending, data, method }"} of the parent form, for buttons inside it
              </td>
            </tr>
            <tr>
              <td>useOptimistic(state, updateFn)</td>
              <td>react</td>
              <td>a temporary "assume it worked" version of state during an action</td>
            </tr>
          </tbody>
        </table>
        <p>
          Actions run inside a <strong>transition</strong> (topic 33), so the page
          stays responsive while they run. After the action finishes, React resets
          uncontrolled fields automatically. In frameworks like Next.js the same{" "}
          <code>action</code> prop can point to a <strong>server function</strong>{" "}
          (topic 47).
        </p>
      </Explain>

      <Example title="1. useActionState + useFormStatus" code={newsletterCode}>
        <NewsletterForm />
        <p className="hint">Try "abc" (error, value kept), then a real email (pending, then success).</p>
        <details>
          <summary>Show SubmitButton.jsx (useFormStatus)</summary>
          <CodeBlock code={submitButtonCode} />
        </details>
        <details>
          <summary>Show fakeServer.js</summary>
          <CodeBlock code={fakeServerCode} />
        </details>
      </Example>

      <Example title="2. useOptimistic: instant UI with rollback" code={optimisticCode}>
        <OptimisticComments />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Calling <code>useFormStatus</code> in the same component that renders
            the <code>{"<form>"}</code>. It only sees a <em>parent</em> form, so
            move it into a child like SubmitButton.
          </li>
          <li>
            With <code>useActionState</code>, forgetting that the action's first
            argument is the previous state: <code>(prevState, formData)</code>,
            not <code>(formData)</code>.
          </li>
          <li>
            Inputs without a <code>name</code>. <code>formData.get()</code> can
            only read named fields.
          </li>
          <li>
            Expecting typed text to survive an error. The form resets after every
            action, so return the values in the state and use them as{" "}
            <code>defaultValue</code> (example 1).
          </li>
          <li>
            Setting state after an <code>await</code> inside an action without{" "}
            <code>startTransition</code>. It is no longer part of the action.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default FormActionsLesson;
