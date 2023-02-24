import { useRef } from "react";
import { NavLink } from "react-router-dom";

import { useModalAnimation } from "../../utils/useModalAnimation";

import homeIcon from "../../assets/home.svg";
import catalogueIcon from "../../assets/small-shop.svg";

interface NavLinksProps {
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavLinks = ({ isActive, setActive }: NavLinksProps) => {
  const element = useRef(null);
  useModalAnimation(element, isActive);

  return (
    <ul className="nav-links" data-visible={isActive} ref={element}>
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
  );
};
