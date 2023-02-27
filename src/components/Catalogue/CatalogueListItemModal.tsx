import { ShopItem } from "../ShoppingCart/ShoppingCartTypes";

import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

import ShopItems from "../../data/ShopItems.json";

import { ShoppingCartItemsContext } from "../../App";
import { useModalAnimation } from "../../utils/useModalAnimation";
import { CreateModal } from "../../utils/createModal";

interface catalogueListItemProps {
  item: ShopItem;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CatalogueListItem = ({
  item,
  isActive,
  setActive,
}: catalogueListItemProps) => {
  const shoppingCartItems = useContext(ShoppingCartItemsContext);
  const element = useRef(null);

  useModalAnimation(element, isActive, true);

  function addItemToCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();

    setTimeout(() => {
      shoppingCartItems.dispatch({ type: "increase quantity", id: item.id });
    }, 450);

    setActive(false);
  }

  return (
    <div
      className="catalogue-list-item-modal"
      data-active={isActive}
      ref={element}
      aria-label="Item modal"
      role="dialog"
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

interface modalData {
  item?: ShopItem;
  isActive: boolean;
}

export const CatalogueListItemModal = () => {
  const animationDuration = 200;

  const modalData = useLoaderData() as modalData;
  const [lastModalData, setLastModalData] = useState<null | modalData>(null);

  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (lastModalData && !isActive) {
      console.log(isActive);
      setTimeout(() => {
        navigate("/catalogue");
      }, animationDuration);
      return;
    }

    if (modalData.isActive) {
      console.log(1);
      setIsActive(true);
      if (modalData !== lastModalData) setLastModalData(modalData);
    }
  }, [modalData, lastModalData, isActive, navigate]);

  return CreateModal(
    CatalogueListItem,
    { item: modalData.item || ShopItems.items[0] },
    isActive,
    setIsActive,
    "overlay",
    200,
    true
  );
};
