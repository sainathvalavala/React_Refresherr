// The real network call. In tests, MSW intercepts this request, so no
// actual server is needed. In the lesson, a fake version is passed in instead.
export async function login(email, password) {
  const response = await fetch("https://api.example.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message ?? `HTTP ${response.status}`);
  return body; // { name }
}

// Used by the live demo: same shape, no network. Password "react" works.
export function fakeLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === "react") resolve({ name: email.split("@")[0] });
      else reject(new Error("Wrong email or password"));
    }, 700);
  });
}
