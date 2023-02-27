import { useRef } from "react";
import { NavLink } from "react-router-dom";

import { useModalAnimation } from "../../utils/useModalAnimation";

import homeIcon from "../../assets/home.svg";
import catalogueIcon from "../../assets/small-shop.svg";

interface NavProps {
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Nav = ({ isActive, setActive }: NavProps) => {
  const element = useRef(null);
  useModalAnimation(element, isActive);

  function setIsActiveToFalse() {
    setActive(false);
  }

  return (
    <nav aria-label="Main menu" data-visible={isActive} ref={element}>
      <ul className="nav-links">
        <li>
          <NavLink
            className="nav-link"
            to="/"
            onClick={setIsActiveToFalse}
            data-testid="main-menu-link-1"
          >
            <span className="nav-link-icon">
              <img src={homeIcon} alt="" />
            </span>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            className="nav-link"
            to="/catalogue"
            onClick={setIsActiveToFalse}
            data-testid="main-menu-link-2"
          >
            <span className="nav-link-icon">
              <img src={catalogueIcon} alt="" />
            </span>
            Catalogue
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
