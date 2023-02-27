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
    e.target.value = quantity.toString();
    if (isNaN(quantity)) quantity = 0;

    ShoppingCartItems.dispatch({
      type: "change quantity",
      id: item.id,
      quantity,
    });
  }

  return (
    <div className="shopping-cart-item" aria-label="Shopping cart item">
      <div className="shopping-cart-item-wrapper">
        <div className="catalogue-item-image">
          <img src={item.image} alt="" />
        </div>

        <div className="shopping-cart-item-container">
          <header>
            <h3>{item.title}</h3>

            <button
              type="button"
              className="shopping-cart-item-close-button"
              onClick={removeItem}
              aria-label="Remove item"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="input-wrapper">
            <button
              className="count-cta"
              onClick={decreaseQuantity}
              aria-label="Reduce item quantity by one"
            >
              -
            </button>
            <input
              value={item.quantity}
              type="number"
              className="shopping-cart-quantity"
              onChange={(e) => {
                handleQuantityInput(e);
              }}
              aria-label="Item quantity"
            />
            <button
              className="count-cta"
              onClick={increaseQuantity}
              aria-label="Increase item quantity by one"
            >
              +
            </button>
          </div>

          <div className="shopping-cart-item-total-price">
            <h4 aria-label="Item total price:">Total:&nbsp;</h4>
            <span aria-label={`$${totalPrice}`}>${totalPrice}</span>
          </div>
        </div>
      </div>

      <div className="shopping-cart-separator"></div>
    </div>
  );
}
