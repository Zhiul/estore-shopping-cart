import { useState, useContext } from "react";
import { ShoppingCartItemsContext } from "../../App";

import { CreateModal } from "../../utils/createModal";
import { NavLinks } from "./NavLinks";

import logo from "../../assets/logo-icon-coloured.png";
import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-cart-open-cta-icon.svg";
import openBurgerMenu from "../../assets/hamburger_icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";

interface NavProps {
  toggleShoppingCartIsOpen: () => void;
}

export const Nav = ({ toggleShoppingCartIsOpen }: NavProps) => {
  const shoppingCartItems = useContext(ShoppingCartItemsContext);

  const [navigationDropdownIsOpen, setNavigationDropdownIsOpen] =
    useState(false);
  const NavLinksModal = CreateModal(
    NavLinks,
    {},
    false,
    navigationDropdownIsOpen,
    setNavigationDropdownIsOpen,
    "overlay overlay-transparent",
    200,
    768
  );

  function getShoppingCartItemsQuantity() {
    if (shoppingCartItems.items.length === 0) return 0;
    return shoppingCartItems.items.reduce(
      (quantity, item) => quantity + item.quantity,
      0
    );
  }
  const shoppingCartItemsQuantity = getShoppingCartItemsQuantity();

  function toggleNavigationDropdown() {
    setNavigationDropdownIsOpen(!navigationDropdownIsOpen);
  }

  return (
    <nav>
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
              aria-label="Number of added items"
            >
              {shoppingCartItemsQuantity}
            </span>
          </button>

          <button
            className="nav-button burger-menu"
            data-open={navigationDropdownIsOpen ? "true" : "false"}
            onClick={toggleNavigationDropdown}
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
    </nav>
  );
};
