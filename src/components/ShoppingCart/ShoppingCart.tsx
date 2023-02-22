import { useContext, useRef } from "react";
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
      data-open={isActive ? "true" : "false"}
      ref={element}
    >
      <header className="shopping-cart-header">
        <div className="shopping-cart-header-title">
          <img src={shoppingCartIcon} alt="" />
          <h3>Order summary</h3>
        </div>

        <button
          className="shopping-cart-close"
          onClick={() => {
            setActive(false);
          }}
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
