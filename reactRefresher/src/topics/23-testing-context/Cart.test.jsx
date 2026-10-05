import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CartProvider from "../22-context-api/CartProvider";
import ProductShelf from "../22-context-api/ProductShelf";
import CartSummary from "../22-context-api/CartSummary";

// Testing the cart from topic 22: a provider component + a custom hook.
// The tests act like a user: click buttons, then read what's on screen.
// They never look at the provider's state directly, so the provider's
// internals can be rewritten without breaking the tests.
function renderCart() {
  return render(
    <CartProvider>
      <ProductShelf />
      <CartSummary />
    </CartProvider>,
  );
}

describe("Cart context", () => {
  it("starts empty", () => {
    renderCart();
    expect(screen.getByText("Your cart is empty.")).toBeTruthy();
  });

  it("adds items, counts duplicates and totals the price", () => {
    renderCart();
    fireEvent.click(screen.getByText("Add Notebook (Rs. 120)"));
    fireEvent.click(screen.getByText("Add Notebook (Rs. 120)"));
    fireEvent.click(screen.getByText("Add Gel pen (Rs. 35)"));

    expect(screen.getByText("3 items, total Rs. 275")).toBeTruthy();
    expect(screen.queryByText("Your cart is empty.")).toBeNull();
  });

  it("removes an item and clears the cart", () => {
    renderCart();
    fireEvent.click(screen.getByText("Add Notebook (Rs. 120)"));
    fireEvent.click(screen.getByText("Add Backpack (Rs. 900)"));

    // getAllByText: several matches, returned as an array
    fireEvent.click(screen.getAllByText("Remove")[0]);
    expect(screen.getByText("1 items, total Rs. 900")).toBeTruthy();

    fireEvent.click(screen.getByText("Clear cart"));
    expect(screen.getByText("Your cart is empty.")).toBeTruthy();
  });

  it("throws a clear error when used without CartProvider", () => {
    // React logs the thrown error to the console; silence it for this test
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<CartSummary />)).toThrow("useCart must be used inside <CartProvider>");

    consoleError.mockRestore();
  });
});
