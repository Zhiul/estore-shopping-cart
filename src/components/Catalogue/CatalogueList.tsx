import { shopCategoryFilter } from "../../routes/Catalogue";

import { CatalogueListItem } from "./CatalogueListItem";
import ShopItems from "../../data/ShopItems.json";

interface CatalogueListProps {
  shopCategoryFilters: shopCategoryFilter[];
}

export const CatalogueList = ({ shopCategoryFilters }: CatalogueListProps) => {
  const enabledFilters = shopCategoryFilters.filter((item) => item.enabled);

  return (
    <main>
      <h2 className="heading">Items</h2>
      <ul className="catalogue-list" aria-label="Items list">
        {ShopItems.items.map((item) => {
          if (enabledFilters.length >= 1) {
            if (enabledFilters.find((filter) => filter.name === item.category))
              return (
                <li key={item.id}>
                  <CatalogueListItem item={item} />
                </li>
              );
          } else {
            return (
              <li key={item.id}>
                <CatalogueListItem item={item} />
              </li>
            );
          }

          return null;
        })}
      </ul>
    </main>
  );
};
