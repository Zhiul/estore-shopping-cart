import { useLockedBody } from "usehooks-ts";

import { useContext } from "react";
import { ShoppingCartItemsContext } from "../../App";
import shoppingCartIcon from "../../assets/shopping-cart.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";

interface ShoppingCartProps {
  shoppingCartIsOpen: boolean;
  toggleShoppingCartIsOpen: () => void;
}

export function ShoppingCart({
  shoppingCartIsOpen,
  toggleShoppingCartIsOpen,
}: ShoppingCartProps) {
  useLockedBody(shoppingCartIsOpen);

  const shoppingCartItems = useContext(ShoppingCartItemsContext);

  function changeItemQuantity(id: string, quantity: number) {
    shoppingCartItems.dispatch({
      type: "change quantity",
      id,
      quantity,
    });
  }

  return (
    <div
      className="shopping-cart"
      data-open={shoppingCartIsOpen ? "true" : "false"}
    >
      <header className="shopping-cart-header">
        <div className="shopping-cart-header-title">
          <img src={shoppingCartIcon} alt="" />
          <h3>Order summary</h3>
        </div>

        <button
          className="shopping-cart-close"
          onClick={toggleShoppingCartIsOpen}
        >
          <CloseIcon aria-hidden="true"></CloseIcon>
        </button>
      </header>

      <div className="shopping-cart-separator"> </div>

      <div className="shopping-cart-wrapper">
        <div className="shopping-cart-items">
          <button className="shopping-cart-header-remove-all">
            Remove all items
          </button>
        </div>

        <div className="shopping-cart-separator"> </div>

        <div className="shopping-cart-checkout">
          <div className="shopping-cart-checkout-total">Total: $</div>
          <button className="main-button">Checkout</button>
        </div>
      </div>
    </div>
  );
}
