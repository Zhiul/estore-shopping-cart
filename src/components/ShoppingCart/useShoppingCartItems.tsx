import { useReducer } from "react";
import ShopItems from "../../data/ShopItems.json";

export type shoppingCartItems = ShoppingCartItem[];

enum shoppingCartActionKind {
  increase = "increase",
  decrease = "decrease",
}

interface shoppingCartAction {
  type: shoppingCartActionKind;
  id: "string";
}

interface ShopItem {
  title: string;
  description: string;
  category: string;
  price: string;
  background: string;
  id: string;
}

class ShoppingCartItem {
  title: string;
  description: string;
  category: string;
  price: string;
  background: string;
  id: string;
  quantity: number;

  constructor(item: ShopItem) {
    this.title = item.title;
    this.description = item.description;
    this.category = item.category;
    this.price = item.price;
    this.background = item.background;
    this.id = item.id;
    this.quantity = 1;
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    this.quantity--;
  }
}

function shoppingCartItemsReducer(
  state: ShoppingCartItem[],
  action: shoppingCartAction
): shoppingCartItems {
  function createShoppingCartItem(id: string) {
    return new ShoppingCartItem(ShopItems.items[parseInt(id)]);
  }

  switch (action.type) {
    case "increase": {
      const newState = [...state];

      let itemIndex = newState.findIndex((item) => item.id === action.id);

      if (itemIndex > -1) {
        const item = newState[itemIndex];
        item.increase();
        return newState;
      } else {
        return [...state, createShoppingCartItem(action.id)];
      }
    }

    case "decrease": {
      const newState = [...state];

      let itemIndex = newState.findIndex((item) => item.id === action.id);

      if (itemIndex > -1) {
        const item = newState[itemIndex];
        item.decrease();
        if (item.quantity === 0) newState.splice(itemIndex, 1);
        return newState;
      }
    }

    default: {
      return state;
    }
  }
}

export function useShoppingCartItems() {
  // @ts-expect-error

  const [shoppingCartItems, dispatch] = useReducer<
    shoppingCartItems,
    shoppingCartAction
  >(shoppingCartItemsReducer, []);

  return { items: shoppingCartItems, dispatch };
}
