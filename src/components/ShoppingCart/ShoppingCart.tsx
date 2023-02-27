import { useContext, useRef } from "react";

import { ShoppingCartItem } from "./ShoppingCartItem";

import { ShoppingCartItemsContext } from "../../App";
import { useModalAnimation } from "../../utils/useModalAnimation";

import shoppingCartIcon from "../../assets/shopping-cart.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";

interface ShoppingCartProps {
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ShoppingCart({ isActive, setActive }: ShoppingCartProps) {
  const shoppingCartItems = useContext(ShoppingCartItemsContext);
  const element = useRef(null);
  useModalAnimation(element, isActive);

  function removeAllItems() {
    shoppingCartItems.dispatch({
      type: "remove all",
    });
  }

  function getTotalPrice() {
    return shoppingCartItems.items.reduce(
      (prevTotal, currentItem) =>
        prevTotal + parseInt(currentItem.price) * currentItem.quantity,
      0
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div
      className="shopping-cart"
      data-open={isActive ? "true" : "false"}
      ref={element}
      aria-label="Shopping cart"
    >
      <header className="shopping-cart-header">
        <div className="shopping-cart-header-title">
          <img src={shoppingCartIcon} alt="" />
          <h2>Order summary</h2>
        </div>

        <button
          className="shopping-cart-close"
          onClick={() => {
            setActive(false);
          }}
          aria-label="Close shopping cart"
        >
          <CloseIcon aria-hidden="true"></CloseIcon>
        </button>
      </header>

      <div className="shopping-cart-separator"> </div>

      <div className="shopping-cart-wrapper">
        <div className="shopping-cart-items">
          <button
            className="shopping-cart-header-remove-all"
            onClick={removeAllItems}
          >
            Remove all items
          </button>

          <ul>
            {shoppingCartItems.items.map((item) => {
              return (
                <li key={item.id}>
                  <ShoppingCartItem item={item} />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="shopping-cart-separator"> </div>

        <div className="shopping-cart-checkout">
          <div className="shopping-cart-checkout-total">
            <h4 aria-label={`Shopping cart total price:`}>Total:&nbsp;</h4>
            <span aria-label={`$${totalPrice}`}>{`$${totalPrice}`}</span>
          </div>
          <button className="main-button">Checkout</button>
        </div>
      </div>
    </div>
  );
}
