import { SHOP_CATEGORY_NAME } from "../../routes/Catalogue";

interface CatalogueFiltersListItemProps {
  name: SHOP_CATEGORY_NAME;
  image: string;
  enabled: boolean;
  toggleCategoryFiltersList: (name: SHOP_CATEGORY_NAME) => void;
}

export const CatalogueFiltersListItem = ({
  name,
  image,
  enabled,
  toggleCategoryFiltersList,
}: CatalogueFiltersListItemProps) => {
  return (
    <div
      className="catalogue-filters-list-item"
      data-enabled={enabled ? "true" : "false"}
      onClick={() => toggleCategoryFiltersList(name)}
      role="button"
    >
      <div className="catalogue-item-image">
        <img src={image} alt="" />
      </div>

      <h4>{name}</h4>
    </div>
  );
};
