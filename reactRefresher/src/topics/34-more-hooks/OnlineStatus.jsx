import { useSyncExternalStore } from "react";

// useSyncExternalStore(subscribe, getSnapshot): read a value that lives
// OUTSIDE React (browser APIs, a third-party store) and re-render when it
// changes. It replaces the useState + useEffect subscription pattern and
// is what libraries like Zustand and Redux use internally.
function subscribe(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function OnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <p>
      {isOnline ? "🟢 Online" : "🔴 Offline"}. Try DevTools &gt; Network &gt; Offline to flip it.
    </p>
  );
}

export default OnlineStatus;
