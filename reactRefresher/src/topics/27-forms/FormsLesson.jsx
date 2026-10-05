import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import SignupFormControlled from "./SignupFormControlled";
import FeedbackFormUncontrolled from "./FeedbackFormUncontrolled";
import PreferencesForm from "./PreferencesForm";
import signupCode from "./SignupFormControlled.jsx?raw";
import feedbackCode from "./FeedbackFormUncontrolled.jsx?raw";
import preferencesCode from "./PreferencesForm.jsx?raw";

function FormsLesson() {
  return (
    <Lesson
      number={27}
      title="Forms"
      definition="Forms collect user input. In React an input is either controlled (React state holds its value) or uncontrolled (the DOM holds it and you read it when needed)."
    >
      <Explain title="How it works">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Controlled</th>
              <th>Uncontrolled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Value lives in</td>
              <td>React state</td>
              <td>the DOM input itself</td>
            </tr>
            <tr>
              <td>Props</td>
              <td>
                <code>value</code> + <code>onChange</code>
              </td>
              <td>
                <code>defaultValue</code> (+ <code>name</code>)
              </td>
            </tr>
            <tr>
              <td>Read it</td>
              <td>any time, from state</td>
              <td>on submit with FormData (or a ref)</td>
            </tr>
            <tr>
              <td>Good for</td>
              <td>live validation, dependent fields, formatting as you type</td>
              <td>simple forms where you only need the final values</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li>
            <strong>
              <code>e.preventDefault()</code>
            </strong>{" "}
            in <code>onSubmit</code> stops the browser from reloading the page
            (its default form behavior).
          </li>
          <li>
            Handle submit on the <code>{"<form onSubmit>"}</code>, not on the
            button's onClick, so pressing Enter in a field also submits.
          </li>
          <li>
            Give inputs a <code>name</code>. One <code>handleChange</code> can
            then update any field with <code>[e.target.name]</code>, and FormData
            can find them.
          </li>
          <li>
            Every <code>{"<label htmlFor>"}</code> should point to an input{" "}
            <code>id</code>. Clicking the label then focuses the input, and screen
            readers announce it.
          </li>
          <li>
            Input values are always <strong>strings</strong>, even for{" "}
            <code>type="number"</code>. Convert with <code>Number()</code>.
          </li>
        </ul>
      </Explain>

      <Example title="1. Controlled form with validation" code={signupCode}>
        <SignupFormControlled />
        <p className="hint">Click into a field and leave it empty, or press Sign up straight away.</p>
      </Example>

      <Example title="2. Uncontrolled form with FormData" code={feedbackCode}>
        <FeedbackFormUncontrolled />
      </Example>

      <Example title="3. Checkboxes, radios, selects and textareas" code={preferencesCode}>
        <PreferencesForm />
      </Example>

      <Example title="4. Bigger forms: libraries">
        <CodeBlock
          code={`
// React Hook Form: uncontrolled under the hood, so few re-renders
// Zod: describe the data shape once, then validate against it
npm install react-hook-form zod @hookform/resolvers

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function Signup() {
  const { register, handleSubmit, formState: { errors } } =
    useForm({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit((data) => save(data))}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
      <input type="password" {...register("password")} />
      <button>Sign up</button>
    </form>
  );
}
`}
        />
        <p>For one or two fields, plain state is fine. For many fields, these save a lot of code.</p>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            <code>value</code> without <code>onChange</code>: React warns, and
            the input is read-only (typing does nothing).
          </li>
          <li>
            Starting with <code>value={"{undefined}"}</code> and later giving it
            a string: "A component is changing an uncontrolled input to be
            controlled". Always initialize with <code>""</code>.
          </li>
          <li>
            Reading <code>e.target.value</code> for a checkbox. It's always{" "}
            <code>"on"</code>. Use <code>e.target.checked</code>.
          </li>
          <li>
            Forgetting <code>e.preventDefault()</code>: the page reloads and all
            state is lost.
          </li>
          <li>
            Storing <code>errors</code> in state and updating them in effects.
            Compute them from the values during render (example 1).
          </li>
          <li>
            Trusting browser-side validation alone. It's for user experience; the
            server must validate again.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default FormsLesson;
