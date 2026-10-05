import { useEffect, useState } from "react";

const strategies = {
  csr: {
    label: "CSR: client-side rendering (this Vite app)",
    steps: [
      "Browser requests the page; the server sends an almost empty index.html. Screen: blank.",
      "Browser downloads the JavaScript bundle. Screen: still blank.",
      "React runs and renders the app shell with a spinner.",
      "The component fetches data from the API (another round trip).",
      "✅ Content visible AND interactive.",
    ],
  },
  ssr: {
    label: "SSR: server-side rendering (Next.js dynamic page)",
    steps: [
      "Browser requests the page; the SERVER runs the components and fetches the data.",
      "✅ Server sends complete HTML. Content visible (not yet clickable).",
      "Browser downloads the JavaScript in the background.",
      "Hydration: React attaches event handlers to the existing HTML.",
      "✅ Interactive.",
    ],
  },
  ssg: {
    label: "SSG: static generation (Next.js static page)",
    steps: [
      "At BUILD time, each page was rendered to an HTML file once.",
      "✅ Browser requests the page; a CDN returns the ready HTML instantly. Content visible.",
      "JavaScript downloads and hydrates.",
      "✅ Interactive. (Data is only as fresh as the last build or revalidation.)",
    ],
  },
};

// Replays each strategy's loading steps one by one, to compare WHEN the
// user first sees content. The steps are revealed with timeouts that the
// effect cleans up if you switch strategy mid-way.
function RenderingTimeline() {
  const [run, setRun] = useState({ strategy: "csr", id: 0 });
  const [visibleCount, setVisibleCount] = useState(0);
  const steps = strategies[run.strategy].steps;

  useEffect(() => {
    const timers = steps.map((_, i) => setTimeout(() => setVisibleCount(i + 1), (i + 1) * 700));
    return () => timers.forEach(clearTimeout);
  }, [run, steps]);

  function play(strategy) {
    setVisibleCount(0);
    setRun({ strategy, id: run.id + 1 });
  }

  return (
    <div className="stack">
      <div className="row">
        {Object.entries(strategies).map(([key, s]) => (
          <button key={key} onClick={() => play(key)}>
            ▶ {s.label.split(":")[0]}
          </button>
        ))}
      </div>
      <strong>{strategies[run.strategy].label}</strong>
      <ol className="log">
        {steps.slice(0, visibleCount).map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RenderingTimeline;
