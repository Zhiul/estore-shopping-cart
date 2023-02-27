import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import styleInject from "style-inject";

import { ShoppingCartItemsContext } from "../App";
import { Header } from "../components/Header/Header";

import fs from "fs";
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

describe("Header component", () => {
  beforeAll(() => {
    styleInject(css);
  });

  it("Renders heading", () => {
    const value = {
      items: [],
      dispatch: jest.fn(),
    };

    render(
      <MemoryRouter>
        <ShoppingCartItemsContext.Provider value={value}>
          <Header toggleShoppingCartModal={jest.fn()} />
        </ShoppingCartItemsContext.Provider>
      </MemoryRouter>
    );
    const heading = screen.getByRole("heading", { name: "EStore" });
    expect(heading).toBeInTheDocument();
  });

  it("Renders shopping cart button", () => {
    const value = {
      items: [],
      dispatch: jest.fn(),
    };

    render(
      <MemoryRouter>
        <ShoppingCartItemsContext.Provider value={value}>
          <Header toggleShoppingCartModal={jest.fn()} />
        </ShoppingCartItemsContext.Provider>
      </MemoryRouter>
    );
    const openShoppingCartButton = screen.queryByRole("button", {
      name: "Open shopping cart",
    });
    expect(openShoppingCartButton).toBeVisible();
  });
});
