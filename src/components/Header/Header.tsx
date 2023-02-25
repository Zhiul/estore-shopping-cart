import { useState, useContext } from "react";
import { ShoppingCartItemsContext } from "../../App";

import { CreateModal } from "../../utils/createModal";
import { NavLinks } from "./Nav";

import logo from "../../assets/logo-icon-coloured.png";
import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-cart-open-cta-icon.svg";
import openBurgerMenu from "../../assets/hamburger_icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";

interface NavProps {
  toggleShoppingCartIsOpen: () => void;
}

export const Header = ({ toggleShoppingCartIsOpen }: NavProps) => {
  const shoppingCartItems = useContext(ShoppingCartItemsContext);

  const [navigationDropdownIsOpen, setNavigationDropdownIsOpen] =
    useState(false);

  const burgerMenuAriaLabel = navigationDropdownIsOpen
    ? "Close main menu"
    : "Open main menu";

  function toggleNavigationDropdown() {
    setNavigationDropdownIsOpen(!navigationDropdownIsOpen);
  }

  function getShoppingCartItemsQuantity() {
    if (shoppingCartItems.items.length === 0) return 0;
    const quantity = shoppingCartItems.items.reduce(
      (quantity, item) => quantity + item.quantity,
      0
    );
    if (quantity >= 100) return "+99";
    return quantity;
  }
  const shoppingCartItemsQuantity = getShoppingCartItemsQuantity();

  const NavLinksModal = CreateModal(
    NavLinks,
    {},
    navigationDropdownIsOpen,
    setNavigationDropdownIsOpen,
    "overlay overlay-transparent",
    200,
    false,
    768
  );

  return (
    <header className="main-header">
      <div className="wrapper">
        <div className="title">
          <img className="logo" src={logo} alt="" />
          <h1>EStore</h1>
        </div>

        {NavLinksModal}

        <div className="nav-buttons">
          <button
            className="nav-button shopping-cart-button"
            aria-label="Open shopping Cart"
            onClick={toggleShoppingCartIsOpen}
          >
            <ShoppingCartIcon aria-hidden="true"></ShoppingCartIcon>
            <span
              className="shopping-cart-items-count"
              aria-label="Number of items added"
            >
              {shoppingCartItemsQuantity}
            </span>
          </button>

          <button
            className="nav-button burger-menu"
            data-open={navigationDropdownIsOpen ? "true" : "false"}
            onClick={toggleNavigationDropdown}
            aria-label={burgerMenuAriaLabel}
          >
            <span className="burger-menu-icon">
              <img
                className="burger-menu-open-icon"
                src={openBurgerMenu}
                alt=""
              />
              <CloseIcon className="burger-menu-close-icon" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
