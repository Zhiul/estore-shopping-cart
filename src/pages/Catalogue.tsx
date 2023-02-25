import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ShopItems from "../data/ShopItems.json";

import { CreateModal } from "../utils/createModal";
import { CatalogueListItemModal } from "../components/Catalogue/CatalogueListItemModal";

import { CatalogueFiltersList } from "../components/Catalogue/CatalogueFilterList";
import { CatalogueList } from "../components/Catalogue/CatalogueList";
import { ShopItem } from "../components/ShoppingCart/ShoppingCartTypes";

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
  const [itemModalIsActive, setItemModalIsActive] = useState(false);
  const [item, setItem] = useState<ShopItem | undefined>(undefined);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!itemModalIsActive) navigate("/catalogue");
  }, [itemModalIsActive]);

  useEffect(() => {
    const item = ShopItems.items.find((item) => item.id === params.itemid);
    if (item) {
      setItem(item);
      setItemModalIsActive(true);
    }
  }, [location]);

  const modal = CreateModal(
    CatalogueListItemModal,
    { item: item || ShopItems.items[0] },
    itemModalIsActive,
    setItemModalIsActive,
    "overlay",
    200,
    true
  );

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
    <div className="wrapper">
      <CatalogueFiltersList
        shopCategoryFilters={shopCategoryFilters}
        toggleCategoryFiltersList={toggleCategoryFiltersList}
      />

      <CatalogueList shopCategoryFilters={shopCategoryFilters} />
      {modal}
    </div>
  );
};
