import { useContext, useRef } from "react";
import { ShopItem } from "../ShoppingCart/ShoppingCartTypes";

import { ShoppingCartItemsContext } from "../../App";
import { useModalAnimation } from "../../utils/useModalAnimation";

interface catalogueListItemProps {
  item: ShopItem;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CatalogueListItemModal = ({
  item,
  isActive,
  setActive,
}: catalogueListItemProps) => {
  const shoppingCartItems = useContext(ShoppingCartItemsContext);
  const element = useRef(null);

  useModalAnimation(element, isActive, true);

  function addItemToCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    shoppingCartItems.dispatch({ type: "increase quantity", id: item.id });
    setActive(false);
  }

  return (
    <div
      className="catalogue-list-item-modal"
      data-active={isActive}
      ref={element}
    >
      <div className="catalogue-list-item-modal-image">
        <img src={item.image} alt="" />
      </div>

      <div className="catalogue-list-item-text">
        <h3 className="catalogue-item-title">{item.title}</h3>
        <div className="catalogue-list-item-price">${item.price}</div>
        <p className="catalogue-list-item-modal-description">
          {item.description}
        </p>

        <button
          className="main-button"
          onClick={(e) => {
            addItemToCart(e);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
