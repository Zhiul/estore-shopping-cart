import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import type { shoppingCartItems } from "./ShoppingCart/useShoppingCartItems";

import { playAnimation } from "../utils/playAnimation";

import logo from "../assets/logo-icon-coloured.png";
import { ReactComponent as ShoppingCartIcon } from "../assets/shopping-cart-open-cta-icon.svg";
import openBurgerMenu from "../assets/hamburger_icon.svg";
import closedBurgerMenu from "../assets/close.svg";
import homeIcon from "../assets/home.svg";
import catalogueIcon from "../assets/small-shop.svg";

export const Nav = ({
  shoppingCartItems,
}: {
  shoppingCartItems: shoppingCartItems;
}) => {
  const [navigationDropdownIsOpen, setNavigationDropdownIsOpen] =
    useState(false);
  const navigationDropdown = useRef<HTMLUListElement>(null);

  function getShoppingCartItemsQuantity() {
    if (shoppingCartItems.length === 0) return 0;
    return shoppingCartItems.reduce(
      (quantity, item) => quantity + item.quantity,
      0
    );
  }
  const shoppingCartItemsQuantity = getShoppingCartItemsQuantity();

  function toggleNavigationDropdown() {
    const navigationDropdownStatus = !navigationDropdownIsOpen;
    setNavigationDropdownIsOpen(navigationDropdownStatus);

    const navigationDropdownAnimation = navigationDropdownStatus
      ? "opening"
      : "closing";
    playAnimation(navigationDropdown, navigationDropdownAnimation);
  }

  return (
    <nav>
      <div className="title">
        <img className="logo" src={logo} alt="" />
        <h1>EStore</h1>
      </div>

      <ul
        className="nav-links"
        data-visible={navigationDropdownIsOpen ? "true" : "false"}
        ref={navigationDropdown}
      >
        <li>
          <NavLink className="nav-link" to="./">
            <span className="nav-link-icon">
              <img src={homeIcon} alt="" />
            </span>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink className="nav-link" to="./catalogue">
            <span className="nav-link-icon">
              <img src={catalogueIcon} alt="" />
            </span>
            Catalogue
          </NavLink>
        </li>
      </ul>

      <div className="nav-buttons">
        <button
          className="nav-button shopping-cart-button"
          aria-label="Open shopping Cart"
        >
          <span className="shopping-cart-button-icon">
            <ShoppingCartIcon></ShoppingCartIcon>
          </span>
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
            <img
              className="burger-menu-close-icon"
              src={closedBurgerMenu}
              alt=""
            />
          </span>
        </button>
      </div>
    </nav>
  );
};
