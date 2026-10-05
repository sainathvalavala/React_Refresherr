import Lesson from "../../components/Lesson";
import Example from "../../components/Example";
import Explain from "../../components/Explain";
import CodeBlock from "../../components/CodeBlock";
import BuggySearch from "./BuggySearch";
import AbortableSearch from "./AbortableSearch";
import ProfileLoader from "./ProfileLoader";
import buggySearchCode from "./BuggySearch.jsx?raw";
import abortableSearchCode from "./AbortableSearch.jsx?raw";
import profileLoaderCode from "./ProfileLoader.jsx?raw";
import fakeApiCode from "./fakeApi.js?raw";

function DataFetchingLesson() {
  return (
    <Lesson
      number={36}
      title="Data fetching patterns"
      definition="Fetching data correctly means handling every state a request can be in (loading, success, error), cancelling requests that are no longer needed, and never letting an old response overwrite a newer one."
    >
      <Explain title="How it works">
        <p>A request is async: between sending it and getting the answer, anything can happen.</p>
        <ul>
          <li>
            <strong>The user changes their mind</strong>: they type another letter
            or open another page. The old request is now useless, and can arrive{" "}
            <em>after</em> the new one (a <strong>race condition</strong>).
          </li>
          <li>
            <strong>The component unmounts</strong> before the answer arrives.
          </li>
          <li>
            <strong>The request fails</strong>: network down, server error. The UI
            needs an error state and a way to retry.
          </li>
        </ul>
        <p>
          <code>AbortController</code> is the browser's standard way to cancel:
          create one, pass <code>controller.signal</code> to{" "}
          <code>fetch(url, {"{ signal }"})</code>, and call{" "}
          <code>controller.abort()</code> when the result is no longer wanted.
          The promise then rejects with an <code>AbortError</code>, which you
          ignore.
        </p>
        <CodeBlock
          code={`
useEffect(() => {
  const controller = new AbortController();

  fetch(\`/api/search?q=\${query}\`, { signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`); // fetch doesn't reject on 404/500!
      return res.json();
    })
    .then(setResults)
    .catch((err) => { if (err.name !== "AbortError") setError(err.message); });

  return () => controller.abort(); // cancel when query changes or on unmount
}, [query]);
`}
        />
      </Explain>

      <Example title="1. The race condition, and the AbortController fix">
        <div className="grid">
          <div className="stack">
            <strong>❌ No cleanup</strong>
            <BuggySearch />
          </div>
          <div className="stack">
            <strong>✅ AbortController</strong>
            <AbortableSearch />
          </div>
        </div>
        <p className="hint">
          Type "ag" quickly in both. "a" is the slowest request, so it finishes
          last. On the left it overwrites the "ag" results; on the right it was
          cancelled.
        </p>
        <details>
          <summary>Show BuggySearch.jsx</summary>
          <CodeBlock code={buggySearchCode} />
        </details>
        <details>
          <summary>Show AbortableSearch.jsx</summary>
          <CodeBlock code={abortableSearchCode} />
        </details>
        <details>
          <summary>Show fakeApi.js</summary>
          <CodeBlock code={fakeApiCode} />
        </details>
      </Example>

      <Example title="2. A status state machine, errors and retry" code={profileLoaderCode}>
        <ProfileLoader />
      </Example>

      <Example title="3. Where can fetching happen?">
        <table>
          <thead>
            <tr>
              <th>Where</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Event handler</td>
              <td>the request is caused by a click or submit (example 2)</td>
            </tr>
            <tr>
              <td>useEffect</td>
              <td>the data must stay in sync with props or state (example 1)</td>
            </tr>
            <tr>
              <td>Custom hook (useFetch, topic 19)</td>
              <td>the same effect logic is needed in many components</td>
            </tr>
            <tr>
              <td>Data library: TanStack Query (topic 37)</td>
              <td>real apps: caching, retries, refetching, deduplication</td>
            </tr>
            <tr>
              <td>Router loaders (topic 38) / Server Components (topic 47)</td>
              <td>load the data before or while the page renders</td>
            </tr>
          </tbody>
        </table>
      </Example>

      <Explain title="Common mistakes" warning>
        <ul>
          <li>
            Assuming <code>fetch</code> rejects on 404 or 500. It doesn't; it only
            rejects on network failure. Check <code>response.ok</code>.
          </li>
          <li>
            Treating <code>AbortError</code> as a real error and showing "Request
            failed" every time the user types.
          </li>
          <li>
            Three booleans (<code>isLoading</code>, <code>isError</code>,{" "}
            <code>isSuccess</code>) that can contradict each other. Use one status.
          </li>
          <li>
            No error UI at all: the spinner spins forever when the server is down.
          </li>
          <li>
            Fetching the same data in five components. Lift it, or let a cache
            (TanStack Query) deduplicate it.
          </li>
        </ul>
      </Explain>
    </Lesson>
  );
}

export default DataFetchingLesson;
