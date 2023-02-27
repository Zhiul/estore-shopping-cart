import { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

import { useShoppingCartItems } from "../components/ShoppingCart/useShoppingCartItems";
import { ShoppingCartItemsContext } from "../App";
import { ShoppingCartItem } from "../components/ShoppingCart/ShoppingCartItem";
import userEvent from "@testing-library/user-event";

const itemData = {
  title: "AMD Ryzen 3 3100",
  description:
    "The AMD Ryzen 3 3100 desktop processor has essential performance for today's top PC games.",
  category: "processor",
  price: "100",
  image: "/assets/Processors/AMD-Ryzen-3-3100.png",
  id: "1",
};

function App() {
  const ShoppingCartItems = useShoppingCartItems();
  const item = ShoppingCartItems.items[0];

  useEffect(() => {
    ShoppingCartItems.dispatch({ type: "increase quantity", id: itemData.id });
  }, []);

  return (
    <ShoppingCartItemsContext.Provider value={ShoppingCartItems}>
      {item && <ShoppingCartItem item={item} />}
    </ShoppingCartItemsContext.Provider>
  );
}

describe("Shopping cart item tests", () => {
  it("Renders heading", () => {
    render(<App />);
    const shoppingCartHeader = screen.queryByRole("heading", {
      name: itemData.title,
    });
    expect(shoppingCartHeader).toBeVisible();
  });

  it("Quantity can be changed", () => {
    render(<App />);

    const quantityInput = screen.getByRole("spinbutton", {
      name: "Item quantity",
    }) as HTMLInputElement;

    const increaseQuantityInputButton = screen.getByRole("button", {
      name: "Increase item quantity by one",
    });
    const decreaseQuantityInputButton = screen.getByRole("button", {
      name: "Reduce item quantity by one",
    });

    const itemTotalPrice = screen.getByRole("heading", {
      name: "Item total price:",
    }).nextElementSibling as HTMLSpanElement;

    expect(quantityInput).toHaveValue(1);

    // Increase and decrease buttons work

    act(() => {
      userEvent.click(increaseQuantityInputButton);
    });

    expect(quantityInput).toHaveValue(2);
    expect(itemTotalPrice.textContent).toBe(`$${parseInt(itemData.price) * 2}`);

    act(() => {
      userEvent.click(decreaseQuantityInputButton);
    });

    expect(quantityInput).toHaveValue(1);
    expect(itemTotalPrice.textContent).toBe(`$${itemData.price}`);

    // Quantity can be changed by typing

    act(() => {
      userEvent.type(quantityInput, "2");
    });

    expect(quantityInput).toHaveValue(12);
    expect(itemTotalPrice.textContent).toBe(
      `$${parseInt(itemData.price) * 12}`
    );
  });
});
