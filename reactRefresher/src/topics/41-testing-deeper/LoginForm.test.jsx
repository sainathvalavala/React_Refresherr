import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import LoginForm from "./LoginForm";

// MSW (Mock Service Worker): a fake server that intercepts real fetch()
// calls in tests. The component and loginApi.js run their real code; only
// the network answer is fake.
const server = setupServer(
  http.post("https://api.example.com/login", async ({ request }) => {
    const { password } = await request.json();
    if (password === "react") {
      return HttpResponse.json({ name: "Priya" });
    }
    return HttpResponse.json({ message: "Wrong email or password" }, { status: 401 });
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" })); // fail on unexpected requests
afterEach(() => server.resetHandlers()); // undo per-test overrides
afterAll(() => server.close());

describe("LoginForm", () => {
  it("logs in with the right password", async () => {
    // userEvent simulates a real user: focus, each keystroke, click
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "priya@example.com");
    await user.type(screen.getByLabelText("Password"), "react");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    // findBy* WAITS (retries up to 1s) for something that appears later
    expect(await screen.findByText("Welcome, Priya!")).toBeTruthy();
  });

  it("shows the server's error message", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "priya@example.com");
    await user.type(screen.getByLabelText("Password"), "wrong");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect((await screen.findByRole("alert")).textContent).toBe("Wrong email or password");
  });

  it("handles a server crash (per-test handler override)", async () => {
    server.use(http.post("https://api.example.com/login", () => HttpResponse.json({}, { status: 500 })));
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Password"), "react");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect((await screen.findByRole("alert")).textContent).toBe("HTTP 500");
  });

  it("works with an injected fake instead of the network", async () => {
    // vi.fn() records its calls; mockResolvedValue makes it return a resolved promise
    const fakeLogin = vi.fn().mockResolvedValue({ name: "Arun" });
    const user = userEvent.setup();
    render(<LoginForm login={fakeLogin} />);

    await user.type(screen.getByLabelText("Email"), "arun@example.com");
    await user.type(screen.getByLabelText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByText("Welcome, Arun!")).toBeTruthy();
    expect(fakeLogin).toHaveBeenCalledWith("arun@example.com", "secret");
  });
});
