// A pretend backend, so the demos work offline. Each call waits like a real
// network request would.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function saveEmail(email) {
  await wait(1000);
  return { ok: true, email };
}

export async function sendComment(text, shouldFail) {
  await wait(1200);
  if (shouldFail) {
    throw new Error("Server rejected the comment");
  }
  return { id: Date.now(), text };
}
