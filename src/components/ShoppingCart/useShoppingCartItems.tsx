import type { ShopItem } from "./ShoppingCartTypes";

import { useReducer } from "react";
import ShopItems from "../../data/ShopItems.json";

export interface shoppingCartItem {
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  id: string;
  quantity: number;
  setQuantity(quantity: number): void;
}

export interface shoppingCartItems {
  items: shoppingCartItemsCollection;
  dispatch: React.Dispatch<shoppingCartAction>;
}

export type shoppingCartItemsCollection = ShoppingCartItem[];

interface shoppingCartChangeItemQuantity {
  type: "change quantity";
  id: string;
  quantity: number;
}

interface shoppingCartIncreaseItemQuantity {
  type: "increase quantity";
  id: string;
}

interface shoppingCartDecreaseItemQuantity {
  type: "decrease quantity";
  id: string;
}

interface shoppingCartRemoveAllItems {
  type: "remove all";
}

type shoppingCartAction =
  | shoppingCartChangeItemQuantity
  | shoppingCartRemoveAllItems
  | shoppingCartIncreaseItemQuantity
  | shoppingCartDecreaseItemQuantity;

class ShoppingCartItem {
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  id: string;
  quantity: number;

  constructor(item: ShopItem, quantity: number) {
    this.title = item.title;
    this.description = item.description;
    this.category = item.category;
    this.price = item.price;
    this.image = item.image;
    this.id = item.id;
    this.quantity = quantity;
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }
}

function shoppingCartItemsReducer(
  state: ShoppingCartItem[],
  action: shoppingCartAction
): shoppingCartItemsCollection {
  function createShoppingCartItem(id: string) {
    const item = ShopItems.items.find((item) => item.id === id);
    if (item) return new ShoppingCartItem(item, 1);
    return new Error("Item has not been found");
  }

  function changeItemQuantity(
    type: "change" | "increase" | "decrease",
    id: string,
    quantity: number = 0
  ) {
    const newState = [...state];

    const itemIndex = newState.findIndex((item) => item.id === id);

    if (itemIndex > -1) {
      const item = newState[itemIndex];

      if (type === "change") {
        item.setQuantity(quantity);
        if (quantity === 0) return newState.splice(itemIndex, 1);
      } else if (type === "increase") {
        item.setQuantity(item.quantity + 1);
      } else if (type === "decrease") {
        item.setQuantity(item.quantity - 1);
        if (item.quantity === 0) return newState.splice(itemIndex, 1);
      }

      return newState;
    } else {
      const item = createShoppingCartItem(id);
      if (item instanceof Error) return state;
      return [...newState, item];
    }
  }

  switch (action.type) {
    case "increase quantity": {
      return changeItemQuantity("increase", action.id);
    }

    case "decrease quantity": {
      return changeItemQuantity("decrease", action.id);
    }

    case "change quantity": {
      return changeItemQuantity("change", action.id, action.quantity);
    }

    case "remove all": {
      const newState: shoppingCartItemsCollection = [];
      return newState;
    }

    default: {
      return state;
    }
  }
}

export function useShoppingCartItems(): shoppingCartItems {
  const [items, dispatch] = useReducer(shoppingCartItemsReducer, []);
  return { items, dispatch };
}
