import {
  queryAllByRole,
  queryByRole,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import ShopItems from "../data/ShopItems.json";

import App from "../App";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ShopItem } from "../components/ShoppingCart/ShoppingCartTypes";

function CataloguePage() {
  return <App />;
}

describe("Catalogue page tests", () => {
  it("Catalogue filters section is visible", () => {
    render(<CataloguePage />);

    const catalogueLink = screen.queryByRole("link", {
      name: "Catalogue",
    }) as HTMLAnchorElement;

    act(() => {
      userEvent.click(catalogueLink);
    });

    const filtersHeading = screen.queryByRole("heading", {
      name: "Filter by category",
    });
    expect(filtersHeading).toBeVisible();

    expect(screen.queryByRole("button", { name: "processor" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "gpu" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "ram" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "motherboard" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "case" })).toBeVisible();
  });

  it("Catalogue list is visible and filters work", () => {
    render(<CataloguePage />);

    const catalogueLink = screen.queryByRole("link", {
      name: "Catalogue",
    }) as HTMLAnchorElement;

    act(() => {
      userEvent.click(catalogueLink);
    });

    // Heading is visible

    const catalogueHeading = screen.queryByRole("heading", {
      name: "Items",
    });
    expect(catalogueHeading).toBeVisible();

    // Displays all items

    const catalogueList = screen.queryByLabelText(
      "Items list"
    ) as HTMLDivElement;
    let catalogueListItems = queryAllByRole(catalogueList, "link");
    expect(catalogueListItems).toHaveLength(25);

    // Displays only filtered items

    const processorFilter = screen.queryByRole("button", {
      name: "processor",
    }) as HTMLButtonElement;

    act(() => {
      userEvent.click(processorFilter);
    });

    catalogueListItems = queryAllByRole(catalogueList, "link");

    const category = "processor";
    let onlyProcessorItems = true;

    for (let i = 0; i < catalogueListItems.length; i++) {
      const catalogueListItem = catalogueListItems[i];
      const catalogueListItemTitle = (
        queryByRole(catalogueListItem, "heading") as HTMLHeadingElement
      ).textContent;
      const shopItemData = ShopItems.items.find(
        (item) => item.title === catalogueListItemTitle
      ) as ShopItem;

      if (shopItemData.category !== category) {
        onlyProcessorItems = false;
        break;
      }
    }

    expect(onlyProcessorItems).toBe(true);
  });
});
