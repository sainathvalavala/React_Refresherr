import { useState } from "react";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import LoginStatus from "./LoginStatus";
import Notifications from "./Notifications";
import WeatherAdvice from "./WeatherAdvice";
import StatusMessage from "./StatusMessage";
import Warning from "./Warning";
import KeepStateToggle from "./KeepStateToggle";
import loginStatusCode from "./LoginStatus.jsx?raw";
import notificationsCode from "./Notifications.jsx?raw";
import weatherAdviceCode from "./WeatherAdvice.jsx?raw";
import statusMessageCode from "./StatusMessage.jsx?raw";
import warningCode from "./Warning.jsx?raw";
import keepStateToggleCode from "./KeepStateToggle.jsx?raw";

function ConditionalLesson() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState(0);
  const [status, setStatus] = useState("idle");
  const [warning, setWarning] = useState("");

  return (
    <Lesson
      number={7}
      title="Conditional rendering"
      definition="Conditional rendering means showing different UI depending on a condition, using normal JavaScript: if statements, the ternary operator (? :) and &&."
    >
      <Explain title="How it works">
        <p>
          React has no special <code>v-if</code> or <code>*ngIf</code>. Because
          JSX is just JavaScript values, you choose <em>which value</em> to
          return with ordinary JavaScript. Pick the technique by how many cases
          there are and where the decision sits:
        </p>
        <table>
          <thead>
            <tr>
              <th>Technique</th>
              <th>Use it when</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>if</code> + early <code>return</code>
              </td>
              <td>The whole component looks different per case</td>
            </tr>
            <tr>
              <td>
                Ternary <code>a ? b : c</code>
              </td>
              <td>Two options, inline inside JSX</td>
            </tr>
            <tr>
              <td>
                <code>a && b</code>
              </td>
              <td>Show something or nothing</td>
            </tr>
            <tr>
              <td>Element variable</td>
              <td>Three or more cases decided with if / else if</td>
            </tr>
            <tr>
              <td>Lookup object</td>
              <td>Each value of a variable has its own UI</td>
            </tr>
            <tr>
              <td>
                <code>return null</code>
              </td>
              <td>The component itself decides to render nothing</td>
            </tr>
          </tbody>
        </table>
        <p>
          <code>false</code>, <code>null</code>, <code>undefined</code> and{" "}
          <code>true</code> render nothing, which is why <code>&&</code> works.
          But <code>0</code> and <code>NaN</code> <em>do</em> render.
        </p>
      </Explain>

      <Example title="1. if / else (early return) and ternary" code={loginStatusCode}>
        <LoginStatus isLoggedIn={isLoggedIn} />
        <div className="row">
          <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
            {/* Ternary: condition ? whenTrue : whenFalse, usable inside JSX */}
            {isLoggedIn ? "Log out" : "Log in"}
          </button>
        </div>
      </Example>

      <Example title="2. && and the 0 gotcha" code={notificationsCode}>
        <Notifications count={messages} />
        <div className="row">
          <button onClick={() => setMessages(messages + 1)}>Add message</button>
          <button onClick={() => setMessages(0)}>Clear</button>
        </div>
      </Example>

      <Example title="3. Element variable (many cases)" code={weatherAdviceCode}>
        <WeatherAdvice />
      </Example>

      <Example title="4. Lookup object" code={statusMessageCode}>
        <StatusMessage status={status} />
        <div className="row">
          {["idle", "loading", "success", "error"].map((s) => (
            <button key={s} onClick={() => setStatus(s)}>
              {s}
            </button>
          ))}
        </div>
      </Example>

      <Example title="5. Returning null" code={warningCode}>
        <Warning message={warning} />
        <div className="row">
          <button onClick={() => setWarning("Your session expires in 1 minute")}>Show warning</button>
          <button onClick={() => setWarning("")}>Clear warning</button>
        </div>
      </Example>

      <Example title="6. Unmounting vs hiding with CSS" code={keepStateToggleCode}>
        <KeepStateToggle />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            <code>{"{count && <p>...</p>}"}</code> prints "0" when count is 0.
            Use <code>{"{count > 0 && ...}"}</code>.
          </li>
          <li>
            Writing <code>{"{if (x) { ... }}"}</code> inside JSX: a syntax error,
            because <code>if</code> is a statement. Use a ternary or move the
            if above the return.
          </li>
          <li>
            Nesting ternaries three levels deep. It works but is unreadable. Use
            an element variable or a lookup object.
          </li>
          <li>
            Calling a hook conditionally:{" "}
            <code>{"if (x) { useState() }"}</code>. Hooks must run in the same
            order every render. Put the condition <em>inside</em> or after the hooks.
          </li>
          <li>
            Expecting a hidden component to remember its state. Removing it
            with <code>&&</code> destroys the state (example 6).
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default ConditionalLesson;
