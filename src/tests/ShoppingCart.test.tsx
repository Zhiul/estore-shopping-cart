import "@testing-library/jest-dom";
import {
  queryByLabelText,
  queryByRole,
  render,
  screen,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import styleInject from "style-inject";

import fs from "fs";

import App from "../App";

const path = require("path");

function getAppRootDir() {
  let currentDir = __dirname;
  while (!fs.existsSync(path.join(currentDir, "package.json"))) {
    currentDir = path.join(currentDir, "..");
  }
  return currentDir;
}

const appRootDir = getAppRootDir();

const css = fs.readFileSync(`${appRootDir}/public/style.css`, {
  encoding: "utf-8",
});

describe("Shopping cart tests", () => {
  beforeAll(() => {
    styleInject(css);
  });

  it("It correctly renders and display items and total price", async () => {
    render(<App />);

    let shoppingCart = screen.queryByLabelText("Shopping cart");
    let shoppingCartTotalPrice;
    let shoppingCartTotalPriceValue;
    let openShoppingCartButton = screen.queryByRole("button", {
      name: "Open shopping cart",
    }) as HTMLElement;
    const catalogueLink = screen.queryByRole("link", {
      name: "Catalogue",
    }) as HTMLAnchorElement;

    // Shopping cart is not visible by default

    expect(shoppingCart).not.toBeVisible();

    // Shopping cart is visible after clicking open shopping cart button

    act(() => {
      userEvent.click(openShoppingCartButton);
    });

    shoppingCart = screen.queryByLabelText("Shopping cart");
    expect(shoppingCart).toBeVisible();

    // Shopping cart total is $0 when it has no items

    shoppingCartTotalPrice = screen.queryByLabelText(
      /Shopping cart total price/
    ) as HTMLHeadingElement;
    shoppingCartTotalPriceValue =
      shoppingCartTotalPrice.nextElementSibling as HTMLSpanElement;
    expect(shoppingCartTotalPriceValue).toHaveAccessibleName("$0");

    // Shopping cart is not visible after clicking close shopping cart button

    const closeShoppingCartButton = screen.queryByRole("button", {
      name: "Close shopping cart",
    }) as HTMLButtonElement;

    act(() => {
      userEvent.click(closeShoppingCartButton);
    });

    shoppingCart = screen.queryByLabelText("Shopping cart");

    expect(shoppingCart).not.toBeVisible();

    // Items can be added to shopping cart

    act(() => {
      userEvent.click(catalogueLink);
    });

    const item = screen.queryByRole("link", {
      name: "AMD Ryzen 3 3100",
    }) as HTMLDivElement;
    const itemPrice = queryByLabelText(item, "Price:")?.textContent as string;

    act(() => {
      userEvent.click(item);
    });

    const addItemButton = (await screen.findByRole("button", {
      name: "Add to cart",
    })) as HTMLButtonElement;

    act(() => {
      userEvent.click(addItemButton);
    });

    openShoppingCartButton = screen.queryByRole("button", {
      name: "Open shopping cart",
    }) as HTMLElement;

    act(() => {
      userEvent.click(openShoppingCartButton);
    });

    const shoppingCartItem = (await screen.findByLabelText(
      "Shopping cart item"
    )) as HTMLDivElement;

    expect(shoppingCartItem).toBeVisible();

    const shoppingCartItemTitle = queryByRole(shoppingCartItem, "heading", {
      name: "AMD Ryzen 3 3100",
    }) as HTMLHeadingElement;
    console.log(shoppingCartItemTitle.textContent);
    expect(shoppingCartItemTitle).toBeVisible();

    // Displays correct total price

    shoppingCartTotalPrice = screen.queryByLabelText(
      /Shopping cart total price/
    ) as HTMLHeadingElement;

    shoppingCartTotalPriceValue =
      shoppingCartTotalPrice.nextElementSibling as HTMLSpanElement;

    expect(shoppingCartTotalPriceValue).toHaveAccessibleName(itemPrice);
  });
});
