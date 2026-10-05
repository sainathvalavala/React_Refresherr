import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import ClockToggle from "./ClockToggle";
import TitleUpdater from "./TitleUpdater";
import UserFetcher from "./UserFetcher";
import EffectTimingDemo from "./EffectTimingDemo";
import MouseTracker from "./MouseTracker";
import FullNameForm from "./FullNameForm";
import clockCode from "./Clock.jsx?raw";
import titleUpdaterCode from "./TitleUpdater.jsx?raw";
import userFetcherCode from "./UserFetcher.jsx?raw";
import effectTimingDemoCode from "./EffectTimingDemo.jsx?raw";
import mouseTrackerCode from "./MouseTracker.jsx?raw";
import fullNameFormCode from "./FullNameForm.jsx?raw";

function UseEffectLesson() {
  return (
    <Lesson
      number={5}
      title="useEffect"
      definition="useEffect runs code after React has updated the page. It is for side effects: work that reaches outside the component, like timers, fetching data, or changing document.title."
    >
      <Explain title="How it works">
        <p>
          Rendering must stay pure: it only calculates JSX. Anything that talks
          to the <em>outside world</em> is a side effect: network requests,
          timers, subscriptions, <code>document.title</code>, localStorage. Put
          side effects in <code>useEffect</code> so they run <em>after</em>{" "}
          React has updated the screen.
        </p>
        <CodeBlock
          code={`
useEffect(() => {
  // 1. setup: runs after render
  const id = setInterval(tick, 1000);

  // 2. cleanup (optional): runs before the next setup, and on unmount
  return () => clearInterval(id);
}, [dependencies]); // 3. when to re-run
`}
        />
        <ul>
          <li>
            <strong>No array:</strong> runs after every render.
          </li>
          <li>
            <strong>
              <code>[]</code>:
            </strong>{" "}
            runs once after the component mounts; cleanup runs when it unmounts.
          </li>
          <li>
            <strong>
              <code>[a, b]</code>:
            </strong>{" "}
            runs after mount, then again whenever <code>a</code> or{" "}
            <code>b</code> changes. List every prop or state value the effect uses.
          </li>
          <li>
            <strong>The cleanup</strong> undoes the setup: clear timers, remove
            listeners, ignore late responses. React runs it before re-running
            the effect and when the component is removed.
          </li>
          <li>
            In development, StrictMode runs setup, then cleanup, then setup
            again, to check that your cleanup works.
          </li>
        </ul>
      </Explain>

      <Example title="1. When effects run (watch the console)" code={effectTimingDemoCode}>
        <EffectTimingDemo />
      </Example>

      <Example title="2. Mount and cleanup: a clock" code={clockCode}>
        <ClockToggle />
      </Example>

      <Example title="3. Run when a value changes" code={titleUpdaterCode}>
        <TitleUpdater />
      </Example>

      <Example title="4. Event listeners with cleanup" code={mouseTrackerCode}>
        <MouseTracker />
      </Example>

      <Example title="5. Fetching data" code={userFetcherCode}>
        <UserFetcher />
      </Example>

      <Example title="6. async/await inside an effect">
        <CodeBlock
          code={`
// The effect function itself can't be async (it must return a cleanup
// function, not a Promise). Define an async function inside and call it:
useEffect(() => {
  let ignore = false;

  async function loadUser() {
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();
    if (!ignore) setUser(user);
  }

  loadUser();
  return () => { ignore = true; };
}, [userId]);
`}
        />
      </Example>

      <Example title="7. You might not need an effect" code={fullNameFormCode}>
        <FullNameForm />
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            <strong>Missing dependencies:</strong> the effect keeps using old
            values (a "stale closure"). The <code>react-hooks</code> lint rule
            warns about this, so don't silence it.
          </li>
          <li>
            <strong>Infinite loops:</strong> setting state in an effect with no
            dependency array (set, render, effect, set...), or listing an
            object or array created during render as a dependency (it's new
            every time).
          </li>
          <li>
            <strong>Forgetting cleanup:</strong> intervals keep running and
            listeners pile up after the component is gone.
          </li>
          <li>
            Writing <code>useEffect(async () =&gt; ...)</code>. Use an inner
            async function (example 6).
          </li>
          <li>
            Using an effect for derived values (example 7) or for things that
            happen because of a click. Put click logic in the event handler.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default UseEffectLesson;
