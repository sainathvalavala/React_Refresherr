import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeContext } from "./ThemeContext";
import ThemeProvider from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";

// Run with: npm test
// render() draws the component into a fake browser DOM (jsdom).
// screen.getByText() finds an element by its text and throws if it's missing.
// screen.queryByText() returns null instead of throwing: use it to check
// that something is NOT on screen.

// A custom render helper: wraps the component in the real provider, so
// tests don't repeat the wrapper every time.
function renderWithTheme(ui, { initialTheme = "light" } = {}) {
  return render(<ThemeProvider initialTheme={initialTheme}>{ui}</ThemeProvider>);
}

describe("ThemeToggle", () => {
  // 1. No provider: the component falls back to createContext's default value
  it("uses the default value without a provider", () => {
    render(<ThemeToggle />);
    expect(screen.getByText("Current theme: light")).toBeTruthy();
  });

  // 2. Real provider: test the whole flow, provider state included
  it("toggles the theme inside ThemeProvider", () => {
    renderWithTheme(<ThemeToggle />);

    fireEvent.click(screen.getByText("Toggle theme"));
    expect(screen.getByText("Current theme: dark")).toBeTruthy();
    expect(screen.queryByText("Current theme: light")).toBeNull();

    fireEvent.click(screen.getByText("Toggle theme"));
    expect(screen.getByText("Current theme: light")).toBeTruthy();
  });

  // 3. Provider props: the helper makes it easy to start from another state
  it("starts from the provider's initialTheme", () => {
    renderWithTheme(<ThemeToggle />, { initialTheme: "dark" });
    expect(screen.getByText("Current theme: dark")).toBeTruthy();
  });

  // 4. Custom value: provide the context directly with a mock function, to
  // test the component alone and check that it calls toggleTheme
  it("calls toggleTheme from the context when clicked", () => {
    const toggleTheme = vi.fn();
    render(
      <ThemeContext value={{ theme: "dark", toggleTheme }}>
        <ThemeToggle />
      </ThemeContext>,
    );

    expect(screen.getByText("Current theme: dark")).toBeTruthy();
    fireEvent.click(screen.getByText("Toggle theme"));
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
