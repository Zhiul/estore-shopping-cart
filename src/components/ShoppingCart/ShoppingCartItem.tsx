import { useContext } from "react";
import type { shoppingCartItem } from "./useShoppingCartItems";
import { ShoppingCartItemsContext } from "../../App";

import { ReactComponent as CloseIcon } from "../../assets/close.svg";

interface ShoppingCartProps {
  item: shoppingCartItem;
}

export function ShoppingCartItem({ item }: ShoppingCartProps) {
  const ShoppingCartItems = useContext(ShoppingCartItemsContext);
  const totalPrice = parseInt(item.price) * item.quantity;

  function removeItem() {
    ShoppingCartItems.dispatch({
      type: "remove item",
      id: item.id,
    });
  }

  function increaseQuantity() {
    ShoppingCartItems.dispatch({
      type: "increase quantity",
      id: item.id,
    });
  }

  function decreaseQuantity() {
    ShoppingCartItems.dispatch({
      type: "decrease quantity",
      id: item.id,
    });
  }

  function handleQuantityInput(e: React.ChangeEvent<HTMLInputElement>) {
    let quantity = parseInt(e.target.value);
    if (isNaN(quantity)) quantity = 0;

    ShoppingCartItems.dispatch({
      type: "change quantity",
      id: item.id,
      quantity,
    });
  }

  return (
    <div className="shopping-cart-item">
      <div className="shopping-cart-item-wrapper">
        <div className="catalogue-item-image">
          <img src={item.image} alt="" />
        </div>

        <div className="shopping-cart-item-container">
          <header>
            <h4>{item.title}</h4>

            <button
              type="button"
              className="shopping-cart-item-close-button"
              onClick={removeItem}
            >
              <CloseIcon />
            </button>
          </header>

          <div className="input-wrapper">
            <button className="count-cta" onClick={decreaseQuantity}>
              -
            </button>
            <input
              value={item.quantity}
              type="number"
              className="shopping-cart-quantity"
              onChange={(e) => {
                handleQuantityInput(e);
              }}
            />
            <button className="count-cta" onClick={increaseQuantity}>
              +
            </button>
          </div>

          <div className="shopping-cart-item-total-price">
            Total: ${totalPrice}
          </div>
        </div>
      </div>

      <div className="shopping-cart-separator"></div>
    </div>
  );
}
