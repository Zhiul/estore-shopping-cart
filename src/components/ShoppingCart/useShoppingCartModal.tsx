import { useState } from "react";

import { ShoppingCart } from "../../components/ShoppingCart/ShoppingCart";
import { CreateModal } from "../../utils/createModal";

type useShoppingCartModalArray = [
  JSX.Element,
  () => void,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

export const useShoppingCartModal = (): useShoppingCartModalArray => {
  const [showShoppingCartModal, setShowShoppingCartModal] = useState(false);

  function toggleShoppingCartModal() {
    setShowShoppingCartModal(!showShoppingCartModal);
  }

  const ShoppingCartModal = CreateModal(
    ShoppingCart,
    {},
    showShoppingCartModal,
    setShowShoppingCartModal,
    "overlay"
  );

  return [
    ShoppingCartModal,
    toggleShoppingCartModal,
    showShoppingCartModal,
    setShowShoppingCartModal,
  ];
};
