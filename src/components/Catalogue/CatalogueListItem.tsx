import { ShopItem } from "../ShoppingCart/ShoppingCartTypes";
import { useState } from "react";

import { CatalogueListItemModal } from "./CatalogueListItemModal";
import { CreateModal } from "../../utils/createModal";

interface catalogueListItemProps {
  item: ShopItem;
}

export const CatalogueListItem = ({ item }: catalogueListItemProps) => {
  const [modalIsActive, setModalIsActive] = useState(false);

  const Modal = CreateModal(
    CatalogueListItemModal,
    { item },
    modalIsActive,
    setModalIsActive,
    "overlay",
    200,
    true
  );

  return (
    <div
      className="catalogue-list-item"
      onClick={() => {
        setModalIsActive(true);
      }}
    >
      <div className="catalogue-item-image">
        <img src={item.image} alt="" />
      </div>

      <h3 className="catalogue-item-title">{item.title}</h3>
      <div className="catalogue-list-item-price">${item.price}</div>
      {Modal}
    </div>
  );
};
