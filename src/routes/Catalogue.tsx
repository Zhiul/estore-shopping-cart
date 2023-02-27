import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/Header/Header";
import { CatalogueFiltersList } from "../components/Catalogue/CatalogueFilterList";
import { CatalogueList } from "../components/Catalogue/CatalogueList";

import ShopItems from "../data/ShopItems.json";
import { useShoppingCartModal } from "../components/ShoppingCart/useShoppingCartModal";

export enum SHOP_CATEGORY_NAME {
  processor = "processor",
  gpu = "gpu",
  ram = "ram",
  motherboard = "motherboard",
  case = "case",
}

export interface shopCategoryFilter {
  name: SHOP_CATEGORY_NAME;
  image: string;
  enabled: boolean;
}

class ShopCategoryFilter {
  name: SHOP_CATEGORY_NAME;
  image: string;
  enabled: boolean;

  constructor(name: SHOP_CATEGORY_NAME, image: string) {
    this.name = name;
    this.image = image;
    this.enabled = false;
  }
}

const initializeShopCategoryFilters = () => {
  const shopCategoryFilters: ShopCategoryFilter[] = [];
  ShopItems.categories.forEach((category) => {
    const name = category.name as SHOP_CATEGORY_NAME;
    const image = category.image;

    shopCategoryFilters.push(new ShopCategoryFilter(name, image));
  });
  return shopCategoryFilters;
};

export const CataloguePage = () => {
  const [ShoppingCartModal, toggleShoppingCartModal] = useShoppingCartModal();

  const [shopCategoryFilters, setShopCategoryFilters] = useState(
    initializeShopCategoryFilters()
  );

  function toggleCategoryFiltersList(name: SHOP_CATEGORY_NAME) {
    const newShopCategoryFilters = [...shopCategoryFilters];
    const filterIndex = newShopCategoryFilters.findIndex(
      (filter) => filter.name === name
    );

    const boolean = !newShopCategoryFilters[filterIndex].enabled;
    newShopCategoryFilters[filterIndex].enabled = boolean;

    setShopCategoryFilters(newShopCategoryFilters);
  }

  return (
    <>
      <Header toggleShoppingCartModal={toggleShoppingCartModal} />
      {ShoppingCartModal}
      <div className="wrapper">
        <CatalogueFiltersList
          shopCategoryFilters={shopCategoryFilters}
          toggleCategoryFiltersList={toggleCategoryFiltersList}
        />

        <CatalogueList shopCategoryFilters={shopCategoryFilters} />

        <Outlet />
      </div>
    </>
  );
};
