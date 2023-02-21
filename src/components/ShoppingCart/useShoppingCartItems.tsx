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

interface shoppingCartRemoveAllItems {
  type: "remove all";
}

type shoppingCartAction =
  | shoppingCartChangeItemQuantity
  | shoppingCartRemoveAllItems;

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
    return new ShoppingCartItem(ShopItems.items[parseInt(id)], 1);
  }

  switch (action.type) {
    case "change quantity": {
      const newState = [...state];

      let itemIndex = newState.findIndex((item) => item.id === action.id);

      if (itemIndex > -1) {
        const item = newState[itemIndex];
        if (action.quantity === 0) return newState.splice(itemIndex, 1);

        item.setQuantity(action.quantity);

        return newState;
      } else {
        return [...state, createShoppingCartItem(action.id)];
      }
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

export function useShoppingCartItems() {
  // @ts-expect-error

  const [shoppingCartItems, dispatch] = useReducer<
    shoppingCartItemsCollection,
    shoppingCartAction
  >(shoppingCartItemsReducer, []);

  return { items: shoppingCartItems, dispatch };
}
