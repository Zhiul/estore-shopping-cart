import { shopCategoryFilter, SHOP_CATEGORY_NAME } from "../../routes/Catalogue";
import { CatalogueFiltersListItem } from "./CatalogueFilterListItem";

interface CatalogueFiltersListProps {
  shopCategoryFilters: shopCategoryFilter[];
  toggleCategoryFiltersList: (name: SHOP_CATEGORY_NAME) => void;
}

export const CatalogueFiltersList = ({
  shopCategoryFilters,
  toggleCategoryFiltersList,
}: CatalogueFiltersListProps) => {
  return (
    <section className="catalogue-filters-list">
      <h2 className="heading">Filter by category</h2>
      <ul>
        {shopCategoryFilters.map((filter) => (
          <li key={filter.name}>
            <CatalogueFiltersListItem
              name={filter.name}
              image={filter.image}
              enabled={filter.enabled}
              toggleCategoryFiltersList={toggleCategoryFiltersList}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
