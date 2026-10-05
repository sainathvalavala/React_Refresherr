import { useState } from "react";
import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import { LanguageContext } from "../22-context-api/LanguageContext";
import LabeledField from "./LabeledField";
import TooltipButton from "./TooltipButton";
import ScoreControls from "./ScoreControls";
import ConditionalContext from "./ConditionalContext";
import OnlineStatus from "./OnlineStatus";
import labeledFieldCode from "./LabeledField.jsx?raw";
import tooltipCode from "./Tooltip.jsx?raw";
import scoreBoardCode from "./ScoreBoard.jsx?raw";
import scoreControlsCode from "./ScoreControls.jsx?raw";
import conditionalContextCode from "./ConditionalContext.jsx?raw";
import onlineStatusCode from "./OnlineStatus.jsx?raw";

function MoreHooksLesson() {
  const [showLanguage, setShowLanguage] = useState(true);

  return (
    <Lesson
      number={34}
      title="More hooks"
      definition="Beyond useState, useEffect, useRef and useContext, React has a set of specialized hooks, each solving one specific problem: unique ids, measuring layout, custom ref APIs, reading external stores, and conditional reads with use()."
    >
      <Explain title="The rest of React's hooks, at a glance">
        <table>
          <thead>
            <tr>
              <th>Hook</th>
              <th>Problem it solves</th>
              <th>Where</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>useId</td>
              <td>unique, stable ids for labels and ARIA attributes</td>
              <td>example 1</td>
            </tr>
            <tr>
              <td>useLayoutEffect</td>
              <td>measure the DOM and adjust before the browser paints</td>
              <td>example 2</td>
            </tr>
            <tr>
              <td>useImperativeHandle</td>
              <td>expose a custom set of methods through a ref</td>
              <td>example 3</td>
            </tr>
            <tr>
              <td>use</td>
              <td>read context or a promise, even conditionally</td>
              <td>example 4, topic 31</td>
            </tr>
            <tr>
              <td>useSyncExternalStore</td>
              <td>subscribe to data that lives outside React</td>
              <td>example 5</td>
            </tr>
            <tr>
              <td>useReducer</td>
              <td>complex state logic</td>
              <td>topic 29</td>
            </tr>
            <tr>
              <td>useMemo / useCallback</td>
              <td>cache calculations and functions</td>
              <td>topic 30</td>
            </tr>
            <tr>
              <td>useTransition / useDeferredValue</td>
              <td>keep the UI responsive during slow renders</td>
              <td>topic 33</td>
            </tr>
            <tr>
              <td>useActionState / useOptimistic / useFormStatus</td>
              <td>forms and async actions</td>
              <td>topic 28</td>
            </tr>
            <tr>
              <td>useDebugValue</td>
              <td>label a custom hook in React DevTools</td>
              <td>
                <code>{'useDebugValue(isOnline ? "Online" : "Offline")'}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </Explain>

      <Example title="1. useId: unique ids for accessible fields" code={labeledFieldCode}>
        <div className="grid">
          <LabeledField label="Email" hint="We never share it." />
          <LabeledField label="Backup email" hint="Same component, different id." />
        </div>
      </Example>

      <Example title="2. useLayoutEffect: measure before paint" code={tooltipCode}>
        <div className="row" style={{ paddingTop: 50 }}>
          <TooltipButton label="Hover me" tip="Short tip" />
          <TooltipButton
            label="Hover me too"
            tip="A much longer tooltip that wraps onto several lines, so its height is only known after rendering"
          />
        </div>
      </Example>

      <Example title="3. useImperativeHandle: a custom ref API" code={scoreBoardCode}>
        <ScoreControls />
        <details>
          <summary>Show ScoreControls.jsx (the parent)</summary>
          <CodeBlock code={scoreControlsCode} />
        </details>
      </Example>

      <Example title="4. use(): reading context conditionally" code={conditionalContextCode}>
        <LanguageContext value="Telugu">
          <ConditionalContext showLanguage={showLanguage} />
        </LanguageContext>
        <div className="row">
          <button onClick={() => setShowLanguage(!showLanguage)}>Toggle showLanguage</button>
        </div>
      </Example>

      <Example title="5. useSyncExternalStore: browser online status" code={onlineStatusCode}>
        <OnlineStatus />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Using <code>useId</code> for list keys. Keys must come from your data;
            useId is for DOM id attributes.
          </li>
          <li>
            Using <code>useLayoutEffect</code> by default. It blocks painting, so
            keep it for measurements that would otherwise flicker; use useEffect
            for everything else.
          </li>
          <li>
            Exposing everything with <code>useImperativeHandle</code>. If the parent
            can get it done by passing a prop, pass the prop.
          </li>
          <li>
            Calling <code>use()</code> inside try/catch for a promise. Use an error
            boundary to catch rejected promises instead.
          </li>
          <li>
            Defining <code>subscribe</code> inside the component for{" "}
            <code>useSyncExternalStore</code>. A new function every render means it
            re-subscribes every render. Define it outside, as in example 5.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default MoreHooksLesson;
