import { Suspense } from "react";
import "./App.css";
import { sections, topics } from "./topics";
import useLocalStorage from "./topics/19-custom-hooks/useLocalStorage";

// App: a sidebar of topics plus the selected lesson. The selected topic
// number is state, and the lesson to show is looked up from it.
// useLocalStorage (topic 19) remembers the open topic across page refreshes.
function App() {
  const [selected, setSelected] = useLocalStorage("react-refresher-topic", 1);
  const topic = topics.find((t) => t.number === selected) ?? topics[0];

  // A component stored in a variable can be rendered as long as the
  // variable name starts with a capital letter.
  const LessonComponent = topic.Component;

  return (
    <div className="app">
      <nav className="sidebar">
        <h1>React Refresher</h1>
        {sections.map((section) => (
          <div key={section.id}>
            <h2 className="sidebar-section">{section.label}</h2>
            <ol>
              {topics
                .filter((t) => t.section === section.id)
                .map((t) => (
                  <li key={t.number}>
                    <button
                      className={t.number === topic.number ? "topic active" : "topic"}
                      onClick={() => setSelected(t.number)}
                    >
                      <span className="topic-number">{t.number}</span>
                      {t.title}
                    </button>
                  </li>
                ))}
            </ol>
          </div>
        ))}
      </nav>

      {/* key: switching topics gives a fresh lesson, so its state starts over.
          Suspense shows the fallback while a lazy lesson file downloads. */}
      <main className="content">
        <Suspense fallback={<p>Loading lesson...</p>}>
          <LessonComponent key={topic.number} />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
