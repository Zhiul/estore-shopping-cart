import { ShopItem } from "../ShoppingCart/ShoppingCartTypes";

interface catalogueListItemProps {
  item: ShopItem;
}

export const CatalogueListItem = ({ item }: catalogueListItemProps) => {
  return (
    <div className="catalogue-list-item">
      <div className="catalogue-item-image">
        <img src={item.image} alt="" />
      </div>

      <h3>{item.title}</h3>
      <div className="catalogue-list-item-price">${item.price}</div>
    </div>
  );
};
